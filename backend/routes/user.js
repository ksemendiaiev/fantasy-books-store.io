const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const {authenticateToken} = require("./userAuth")

//Sign Up
router.post("/sign-up", async (req, res) => {
    try {
        const {username, email, password, address} = req.body;

        //check username length is more than 4
        if (username.length < 4) {
            return res
                .status(400)
                .json({message: "Username length should be greater than 3"});
        }

        //check username already exists ?
        const existingUsername = await User.findOne({username: username});
        if (existingUsername) {
            return res
                .status(400)
                .json({message: "Username already exists"})
        }

        //check email already exists ?
        const existingEmail = await User.findOne({email: email});
        if (existingEmail) {
            return res
                .status(400)
                .json({message: "Email already exists"})
        }

        // check password's length
        if (password.length <= 5) {
            return res.status(400).json({message: "Password's length should be greater than 5"});
        }
        const hashPassword = await bcrypt.hash(password, 7);

        const newUser = new User({
            username: username,
            email: email,
            password: hashPassword,
            address: address,
        });
        await newUser.save();
        return res.status(200).json({message: "SignUp Successfullly"});

    } catch (e) {
        console.log("Error registration: ", e)
        res.status(500).json({message: "Internal server error"});
    }
});

//Sign in
router.post("/sign-in", async (req, res) => {
    try {
        const {username, password} = req.body;

        const existingUser = await User.findOne({username});
        if (!existingUser) {
            return res.status(400).json({message: "Invalid username"});
        }

        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(400).json({message: "Invalid credentials"});
        }

        const authClaims = [
            {name: existingUser.username},
            {role: existingUser.role}
        ];
        const token = jwt.sign({authClaims}, "bookStore123", {expiresIn: "24h"});
        return res.status(200).json({
            id: existingUser._id,
            role: existingUser.role,
            token: token
        });
    } catch (e) {
        return res.status(500).json({message: "Internal server error: ", e});
    }
});

// get user info

router.get("/get-user-information", authenticateToken, async (req, res) => {
    try {
        const {id} = req.headers;
        const data = await User.findById(id);
        return res.status(200).json(data);
    } catch (e) {
        res.status(500).json({message: "Internal server error"})
    }
})

//Update address
router.put("/update-address", authenticateToken, async (req, res) => {
    try {
        const {id} = req.headers;
        const {address} = req.body;

        await User.findByIdAndUpdate(id, {address: address});
        return res.status(200).json({message: "Address updated successfully"})
    } catch (e) {
        res.status(500).json({message: "Internal server error"})
    }
})
// Toggle user role
router.put("/toggle-role", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;

        // Найти пользователя по ID
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Переключить роль пользователя
        user.role = user.role === "admin" ? "user" : "admin";
        await user.save();

        // Отправить ответ с новой ролью
        res.status(200).json({
            message: `Role switched to ${user.role}`,
            newRole: user.role,
        });
    } catch (e) {
        console.error("Error toggling role:", e);
        res.status(500).json({ message: "Internal server error" });
    }
});
module.exports = router;