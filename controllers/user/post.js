const UserModel = require('../../models/user')
const mongoose = require('mongoose')
const utils = require('./../../utils/encryption.util')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
    upsertUser: async (req, res) => {
        const { username, password } = req.body;
        const userNameTaken = await UserModel
        .findOne({ username })
        .exec()

        if(userNameTaken) {
            console.log(`username ${req.body.username}, already exists`)
            return res.status(409)
            .json('username already taken')
        }

        const encryptedPassword = await utils.encryptString(password);
        // create a instance of product using our mongoose Product model
        const user = new UserModel({
            _id: new mongoose.Types.ObjectId(),
            username,
            password: encryptedPassword,
        })
        user
        .save()
        .then(result => {
            console.log('upsertUser', `user ${req.body.username} created or updated`)
            res.status(201)
            // create an instance of a vanilla js class as the return value
            .json('user created successfully')
        })
        .catch(error => {
            console.log(`unable to create user: ${error}`)
            res.status(500)
            .json({ error })
        })
    },
    login: async (req, res) => {
        const { username, password } = req.body;

        const user = await UserModel
        .findOne({ username })
        .exec();

        if(!user) {
            res.status(401).json('no matching username')
        }

        const compareResult = await bcrypt.compare(password, user.password);
        if(compareResult) {
            const token = await jwt.sign({
                username,
                userId: user._id
            }, 'cockbags', { expiresIn: '1h' })
            res.status(200).json(token)
        }
        else {
            res.status(400).json('incorrect username or password')
        }
    },
    deleteUser: (req, res) => {
        const { userId } = req.params;

        UserModel
        .remove({ _id: userId })
        .exec()
        .then(result => res.status(200).send())
        .catch(error => {
            res.status(500)
            .json({ error })
        })
    }
}