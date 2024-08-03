const Compony = require("../models/ComponyModel");

// Register a compony
const registerCompony = async (req, res) => {
    try {
        //get componyName from req.body
        const { componyName } = req.body;
        //validation - componyName is required
        if (!componyName) {
            return res.status(400).json({
                message: "Company name is required.",
                success: false
            });
        };
        //validation - is componyName exist or not
        const compony = await Compony.findOne({ name: componyName });
        if (compony) {
            return res.status(400).json({
                message: "You can't register same company.",
                success: false
            })
        };
        //save componyName in DB
        compony = await Compony.create({
            name: componyName,
            userId: req.id
        });
        //return response
        return res.status(200).json({
            success: true,
            message: "Compony registered successfully.",
            compony
        });

    } catch (error) {
        console.log(error);
    }
};
// Get the compony
const getCompony = async (req, res) => {
    try {
        const userId = req.id;
        console.log("UserId: ", userId);
        const companies = await Compony.find({ userId });
        if (!companies) {
            return res.status(404).json({
                message: "Companies not found.",
                success: false
            })
        }
        return res.status(200).json({
            success:true,
            companies,
        })

    } catch (error) {
        console.log(error);
    }
};
// Get the compony by ID (Single compony)
const getComponyById = async (req, res) => {
    try {

    } catch (error) {
        console.log(error);
    }
};
// Update a compony details
const updateCompony = async (req, res) => {
    try {
        //get data from req.body
        const { name, description, website, location } = req.body;
        //validation - all fields are required
        if (!name || !description || !website || !location) {
            res.status(400).json({
                success: false,
                success: "All fields are required!"
            })
        };

    } catch (error) {
        console.log(error);
    }
};

module.exports = { registerCompony, getCompony, getComponyById, updateCompony };