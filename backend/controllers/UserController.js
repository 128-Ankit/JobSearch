const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register User
const register = async (req, res) => {
    try {
        //get data from req.body
        const { name, email, phoneNumber, password, role } = req.body;
        //validation - all fields required
        if (!name || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "All fields required",
                success: false
            });
        };

        //validation - user already exist or not
        const user = await User.findOne({ email });
        if (user) {
            return res.status(401).json({
                success: false,
                message: "User already exist!"
            })
        }

        //hash password before save in DB
        const hashPassword = await bcrypt.hash(password, 10);

        //save entry in DB
        const userDetails = await User.create({
            name,
            email,
            phoneNumber,
            password: hashPassword,
            role,
        });

        //return response
        res.status(200).json({
            success: true,
            message: "User registered successfully!",
            userDetails
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "User not registered something went wrong!",
        });
    }
}

// Login User
const login = async (req, res) => {
    try {
        //get data from req.body
        const { email, password, role } = req.body;
        //validation - fields are required
        if (!email || !password || !role) {
            return res.status(400).json({
                success: false,
                message: "All fields are required!"
            })
        };
        //validation - is user exist or not
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Pleas register first!"
            })
        };
        //match password
        const matchPassword = await bcrypt.compare(password, user.password);
        console.log("matchedPassword: ", matchPassword);
        //validation - if password not matched
        if (!matchPassword) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials!"
            })
        };

        //validation - is role matched or not
        if (role !== user.role) {
            return res.status(400).json({
                success: false,
                message: "Account does not match for this role!"
            })
        };
        //create a token
        const tokenData = {
            userId: user._id
        }

        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '24h' });
        console.log("Token is: ", token);

        user = {
            _id: user._id,
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile,
            token
        }
        console.log("USer is: ", user);
        

        //return response and create cookies
        const options = {
            expire: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            sameSite: 'strict'
        };
        return res.cookie("token", token, options).status(200).json({
            success: true,
            message: `Welcome ${user.name}`,
            userDetails: user
        });

    } catch (error) {
        console.log(error)
        res.status(400).json({
            success:false,
            message:"Login failed try again!"
        });
    }
}

// Logout User
const logout = async (req, res) => {
    try {
        //for logout remove token from cookies
        return res.cookie("token", "", {maxAge: 0}).json({
            message: "Logged out successfully.",
            success: true
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            success:false,
            message:"Logout failed try again!"
        });
    }
}

// Update User
const updateUser = async (req, res) => {
    try {

    } catch (error) {

    }
}

module.exports = { register, login, logout, updateUser };