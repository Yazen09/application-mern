const express = require('express');
const app = express();
app.use(express.json());
require("dotenv").config();
console.log("Cloudinary Config:", process.env.CLOUD_NAME, process.env.API_KEY, process.env.API_SECRET);
const connectDB = require("./config/connectDB");
connectDB() ;
app.use("/api/products", require("./routes/product"));

app.use("/api/user",require("./routes/user"))
const PORT = process.env.PORT || 2025;
var cors = require('cors')
 
app.use(cors())
app.listen(PORT , error=> {
    error ? console.error(`fail to connect , ${error}`) : 
    console.log(`Server is running at ${PORT}`)
})