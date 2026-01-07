const router = require('express').Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

// Sign up
router.post("/register", async (req, res) => {
    try {
        const { email, username, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        // Save user
        const user = new User({ email, username, password: hashPassword });
        await user.save();

        return res.status(201).json({ message: "User registered successfully" });

    } catch (e) {
        console.error("Registration error:", e);
        return res.status(500).json({ message: "Internal server error" });
    }
});


//sign in
router.post("/signin", async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email});
        if(!user) {
              return res.status(401).json({ message: "Please sign up first" });
        }

        const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);
        if(!isPasswordCorrect) {
              return res.status(401).json({ message: "Incorrect password" });
        }

        const {password, ...others } = user._doc;
       return res.status(200).json({others});
    } catch (e) {
        console.error("Signin error:", e);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// get user
router.get("/getUser/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const { password, ...others } = user._doc;
        return res.status(200).json({ user: others });
    } catch (e) {
        console.log("Error:", e);
        return res.status(500).json({ message: "Something went wrong" });
    }
});


module.exports = router;
