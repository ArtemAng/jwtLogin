const { Router } = require('express');
const bcrypt = require('bcryptjs')
const User = require('../models/User');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const router = Router();

// /api/auth/registrations
router.post(
    '/registrations',
    [
        check('email', 'Invalid email address.').isEmail(),
        check('password', 'Minimal password length is 1 symbol').isLength({ min: 1 })
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array(), message: 'Wrong data.' });

            const { email, password } = req.body;
            const candidate = await User.findOne({ email });

            if (candidate)
                res.status(400).json({ message: 'This user already exists.' });
            const hashedPassword = await bcrypt.hash(password, 12);
            const user = new User({ email, password: hashedPassword });

            await user.save();
            res.status(200).json({ message: 'User registered.' })

        } catch (e) {
            res.status(500).json({ message: 'Something wrong, try again.' })
        }
    });

router.post(
    '/login',
    [
        check('email', 'Invalid email address.').normalizeEmail().isEmail(),
        check('password', 'Minimal password length is 1 symbol.').isLength({ min: 1 })
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty) return res.status(400).json({ errors: errors.array(), message: 'Wrong data.' })

            const { email, password } = req.body;

            const user = User.findOne({ email });
            if (!user)
                res.status(400).json({ message: 'This user does not exist.' });

            const comparePasswords = await bcrypt.compare(password, user.password);
            if (!comparePasswords)
                res.status(400).json({ message: 'Invalid password.' }); //or email
            const token = jwt.sign({ userId: user.id }, config.get('jwtSecret'), { expiresIn: '1h' });
            res.json({ token, id: user.id })
        } catch (e) {
            res.status(500).json({ message: 'Something wrong, try again.' })
        }
    });
module.exports = router;