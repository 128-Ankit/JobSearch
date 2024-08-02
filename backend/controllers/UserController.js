const User = require("../models/UserModel");
const bcrypt = require("bcrypt");

// Register User
const register = async (req, res) => {
    try {
        //get data from req.body
        const {name, email, phoneNumber, password, role} = req.body;
        //validation - all fields required
        if (!name || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "All fields required",
                success: false
            });
        };

        //validation - user already exist or not
        const user = await User.findOne({email});
        if(user){
            return res.status(401).json({
                success:false,
                message: "User already exist!"
            })
        }

        //hash password before save in DB
        const hashPassword = await bcrypt.hash(password, 10);

        //save entry in DB
       const userDetails =  await User.create({
            name,
            email,
            phoneNumber,
            password: hashPassword,
            role,
        });

        //return response
        res.status(200).json({
            success:true,
            message:"User registered successfully!",
            userDetails
        });

    } catch (error) {
        res.status(500).json({
            success:false,
            message:"User not registered something went wrong!",
        });
    }
}

// Login User
const login = async (req, res) => {
    try {

    } catch (error) {

    }
}

// Logout User
const logout = async (req, res) => {
    try {

    } catch (error) {

    }
}

// Update User
const updateUser = async (req, res) => {
    try {

    } catch (error) {

    }
}

module.exports = { register, login, logout, updateUser };