const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log('DB connected successfully');
    } catch (error) {
        console.log("DB Connection failed! ", error);    
    }
}

module.exports = connectDB;