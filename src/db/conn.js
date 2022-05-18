const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/todosDB")
.then(() => {
    console.log("Connection successfully established...");
}).catch((err) => {
    console.log("Connetion failed...");
})