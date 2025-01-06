const { User } = require('../models');

exports.getUsers = async (req, res) => {
    const users = await User.findAll();
    res.json(users);
};

exports.createUser = async (req, res) => {
    const { name, email } = req.body;
    try {
        const user = await User.create({ name, email });
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
