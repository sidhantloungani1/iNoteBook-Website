const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require("../middleware/fetchuser")


// secret for auth token
const JWT_SECRET = "helloworld$12"

// setting limitations for user to signup

//Route 1: Enpoint api/auth/createUser for signup. No login required

router.post('/createUser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password').isLength({ min: 5 }),

    // promises (async, await)

], async (req, res) => {

    // checking weather entered data is valid or through errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {

        // checking weather user already exists

        let user = await User.findOne({ email: req.body.email });
        if (user) {

            return res.status(400).json({ error: "user already exists" })

        }

        // creating salt secure layer using bcrypt js

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        // finall creating user

        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
        })

        // creating unique auth token considering id of user

        const data = {

            user: {

                id: user.id

            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        console.log(authtoken)

        res.json({ authtoken })

        // check weather error in syntax

    } catch (error) {

        console.error(error.message);
        res.status(500).send("some error occured")
    }


})

//ROUTE 2: Authenticate enpoint api/auth/login for login. No login required

router.post('/login', [

    body('email', 'Enter a valid email').isEmail(),
    body('password', '').exists(),

    // promises (async, await)

], async (req, res) => {

    // checking weather entered data is valid or through errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {

        let user = await User.findOne({ email });
        if (!user) {

            return res.status(400).json({ error: "Enter valid email credentials" })

        }
        const passcompare = await bcrypt.compare(password, user.password);

        if (!passcompare) {

            return res.status(400).json({ error: "Enter valid credentials" })
        }

        const data = {

            user: {

                id: user.id

            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({ authtoken })

    } catch (error) {

        console.error(error.message);
        res.status(500).send("Internal Server Error")

    }

})

//ROUTE 3: Get user data api/auth/getuser for login. login required

router.post('/getuser', fetchuser, async (req, res) => {

    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user)
    } catch (error) {

        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }


})
module.exports = router