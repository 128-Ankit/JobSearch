const express = require("express");
const app = express();

require("dotenv").config();

//importing all routes here
const userRoute = require("./routes/UserRoute");

const cors = require("cors");
const connectDB = require("./utils/DataBase");
const cookieParser = require("cookie-parser");

// middleware
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
    origin:'http://localhost:5173',
    credentials:true
}

app.use(cors(corsOptions));

const PORT = process.env.PORT || 4000;

// API's
app.use("/api/v1/user", userRoute);


app.listen(PORT,()=>{
    connectDB();
    console.log(`Server running at port: ${PORT}`);
});

app.get("/", (req,res)=> {
    res.send("hii there!")
})