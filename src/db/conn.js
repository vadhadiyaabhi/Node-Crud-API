require("dotenv").config();
const mongoose = require("mongoose");

// mongoose.connect("mongodb://localhost:27017/todosDB")
mongoose.connect(process.env.DB_CONNECTION)
.then(() => {
    console.log("Connection successfully established...");
}).catch((err) => {
    console.log("Connetion failed...");
})