require("dotenv").config();
const mongoose = require("mongoose");
const log = require("../logger/index");

// mongoose.connect("mongodb://localhost:27017/todosDB")
mongoose.connect(process.env.DB_CONNECTION)
.then(() => {
    // console.log("Connection successfully established...");
    log.info("Connection successfully established...");
}).catch((err) => {
    // console.log("Connetion failed...");
    log.error("Connetion failed...", err);
    process.exit(1);
})