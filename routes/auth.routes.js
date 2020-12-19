const { Router } = require('express');
const bcrypt = require('bcryptjs')
const User = require('../models/User');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const router = Router();
const auth = require('../midleware/auth.midleware');

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
            const { email, password, name } = req.body;
            const candidate = await User.findOne({ email });
            if (candidate)
                res.status(400).json({ message: 'This user already exists.' });
            const hashedPassword = await bcrypt.hash(password, 12);
            const date = new Date().toString().split(' ');
            const user = new User({ email, password: hashedPassword, name, status: false, isBlocked: false, regDate: `${date[1]}/${date[2]}/${date[3]}`, lastLoginDate: `--/--/--` });
            user.save();

            res.status(200).json({ message: 'User registered.' })

        } catch (e) {
            res.status(500).json({ message: 'Something wrong, try again.' + e.message })
        }
    });

// router.post('/registrations',
//     [
//         check('email', 'Invalid email').isEmail(),
//         check('password', 'The password length must be greater than 6').isLength({min: 1})
//     ],
//     async (req, res) => {
//     try {
//         const errors = validationResult(req)
//         if(!errors.isEmpty()) {
//             return res.status(400).json({
//                 errors: errors.array(),
//                 message: "Invalid data"
//             })
//         }
//         const {email, name, password} = req.body
//         const candidate = await User.findOne({$or: [
//             {email}, {name}
//             ]})
//         if(candidate) {
//             res.status(400).json({message: "Such user already exist"})
//         }
//         const hashedPassword = await bcrypt.hash(password, 12)
//         const currentDate = new Date()
//         const today = `${currentDate.getFullYear()}-${currentDate.getMonth()+1}-${currentDate.getDate()} ${currentDate.getHours()}:${currentDate.getMinutes()}`
//         const user = new User({email, name, password: hashedPassword, registrationDate: today, lastLoginDate: today, block: false})
//         await user.save()
//         res.status(201).json({message: 'User was created'})

//     } catch(e) {
//         res.status(500).json({message: 'Something went wrong, try again' + e.message} )
//     }
// });

router.post('/logout', auth, async (req, res) => {
    try {

        console.log(req.user);
        const user = await User.findById(req.user.userId);
        user.status = false;
        user.save();
        res.status(200).json({ message: 'You are logouted.' });
    } catch (e) {
        res.status(500).json({ message: 'Not availible id or token.' });
    }
})

router.post(
    '/login',
    [
        check('email', 'Invalid email address.').normalizeEmail().isEmail(),
        check('password', 'Minimal password length is 1 symbol.').isLength({ min: 1 })
    ],
    async (req, res) => {
        try {

            const errors = validationResult(req);
            if (!errors.isEmpty) {
                return res.status(400).json({ errors: errors.array(), message: 'Wrong data.' })
            }

            const { email, password } = req.body;

            const user = await User.findOne({ email });
            if (!user) {
                res.status(400).json({ message: 'This user does not exist.' });
            }
            if (user.isBlocked) {
                res.status(400).json({ message: 'You are blocked' });
            }
            const date = new Date().toString().split(' ');
            user.lastLoginDate = `${date[1]}/${date[2]}/${date[3]} ${date[4]}`;
            const comparePasswords = await bcrypt.compare(password, user.password);
            if (!comparePasswords) {
                res.status(400).json({ message: 'Invalid password.' }); //or email
            }
            const token = jwt.sign({ userId: user.id }, config.get('jwtSecret'), { expiresIn: '1h' });
            res.json({ token, id: user.id, email })
            user.status = true///
            user.save();///
        } catch (e) {
            res.status(500).json({ message: 'Something wrong, try again.' })
        }
    });
module.exports = router;