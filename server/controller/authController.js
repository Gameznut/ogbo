const User = require('../models/UserModel').User
const bcrypt = require('bcrypt');

module.exports = {

    index: async (req, res) => {
        res.send('hello')
    },

    userGet: async (req, res) => {
        const id =req.params.id
        try {
            const user = await User.find({
                position: id
            })
            res.json({
                user
            })
            console.log(user);
        } catch (error) {
            console.log(error);
        }
    },

    loginPost: async (req, res, next) => {
        // if (req.body <= 0) {
        //     console.log('empty');
        // } else {
        // }
        try {
            const user = await User.findOne({
                email: req.body.email,
                position: req.body.position
            })
            if (user) {
                bcrypt.compare(req.body.password, user.password).then(result => {
                    if (result) {
                        res.status(200).json({
                            message: 'sucesssfully logged in'
                        })
                    } else {
                        return res.status(404).json({
                            errorStatus: "Invalid User or Password"
                        })
                    }
                })
            } else {
                return res.status(404).json({
                    message: "User nots found"
                })
            }
        } catch (error) {
            res.status(404).json({
                message: "User not found"
            })
        }



    },

    signupGet: (req, res) => {
        res.send('signup');
    },

    signupPost: (req, res) => {
        if (req.body <= 0) {
            console.log('empty');
        } else {
            User
                .findOne({
                    email: req.body.email
                })
                .then(user => {
                    if (user) {
                        return res.status(409).json({
                            status: "error"
                        });
                    } else {
                        const newUser = new User(req.body)
                        bcrypt.genSalt(10, (err, salt) => {
                            bcrypt.hash(newUser.password, salt, (err, hash) => {
                                newUser.password = hash
                                newUser.save().then(user => {
                                    console.log(user);
                                    res.send('done')
                                }).catch((error) => {
                                    console.log(error.message);
                                })
                            })
                        })
                    }
                }).catch((err) => {
                    console.log(err);
                })
        }
    }

};