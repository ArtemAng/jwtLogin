const { Router } = require('express');
const User = require('../models/User');
const auth = require('../midleware/auth.midleware');
const config = require('config');

const router = Router();

router.get('/', auth, async (req, res) => {
    try {
        const users = await User.find();
        const curentUser = await User.findById(req.user.userId);
        if (curentUser.isBlocked) {
            curentUser.status = false;
            curentUser.save();
            res.status(401).json({ message: 'You are blocked' });
            throw 'eee';
        }
        res.json(Array.from(users).map(i => ({ email: i.email, name: i.name, status: i.status, isBlocked: i.isBlocked, regDate: i.regDate, lastLoginDate: i.lastLoginDate })));
    } catch (e) {
        res.status(500).json({ message: 'Something wrong...' })
    }
})

router.post('/deleteUser', auth, async (req, res) => {
    try {
        const { usersMails } = req.body;
        const curentUser = await User.findById(req.user.userId);
        if (curentUser.isBlocked) {
            curentUser.status = false;
            curentUser.save();
            res.status(401).json({ message: 'You are blocked' });
            throw 'eee';
        }
        const users = await User.find();
        const emails = usersMails.map(emailId => users[parseInt(emailId) - 1].email);

        // if (user.isBlocked) {
        //     res.status(400).json({ message: 'You are blocked' });
        // }
        await emails.map(async email => await User.deleteOne({ email }))

        res.status(200).json({ message: 'User was deleted.' });
    } catch (e) {
        res.status(500).json({ message: 'Something wrong...' })
    }
})

router.post('/blockUser', auth, async (req, res) => {
    try {
        const { usersMails } = req.body;

        const users = await User.find();
        const emails = usersMails.map(emailId => users[parseInt(emailId) - 1].email);
        const curentUser = await User.findById(req.user.userId);
        if (curentUser.isBlocked) {
            curentUser.status = false;
            curentUser.save();
            res.status(401).json({ message: 'You are blocked' });
            throw 'eee';
        }
        const blockUsers = await emails.map(async email => {
            const user = await User.findOne({ email });
            user.isBlocked = true;
            user.save();
        });
        res.status(200).json({ message: 'User was blocked.' });

    } catch (e) {
        res.status(500).json({ message: 'Something wrong...' })
    }
});

router.post('/unlockUser', auth, async (req, res) => {
    try {
        const { usersMails } = req.body;

        const users = await User.find();
        const emails = usersMails.map(emailId => users[parseInt(emailId) - 1].email);
        const curentUser = await User.findById(req.user.userId);
        if (curentUser.isBlocked) {
            curentUser.status = false;
            curentUser.save();
            res.status(401).json({ message: 'You are blocked' });
            throw 'eee';
        }
        const blockUsers = await emails.map(async email => {
            const user = await User.findOne({ email });
            user.isBlocked = false;
            user.save();
        });
        res.status(200).json({ message: 'User was blocked.' });

    } catch (e) {
        res.status(500).json({ message: 'Something wrong...' })
    }
});

module.exports = router;