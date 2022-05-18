const express = require("express");
require("./db/conn");
const todoRouter = require("./routers/todo");
const userRouter = require("./routers/user");

const app = express();
const port = process.env.PORT || 8000;



// THIS CODE IS NOW SHIFTED TO ROUTER FOLDER----------------------------------
// // 1. -------------------------------------- Create a new Router
// const router = new express.Router();

// // 2. -------------------------------------- Define the router
// router.get("/", (req, res) => {
//     res.send("Hii, Express router working fine");
// })

// // 3. -------------------------------------- Register express router
app.use(express.json());   //------------------ This line must be before defined router
app.use(todoRouter);
app.use(userRouter);


app.get("/", (req, res) => {
    res.send("Hii, Todos Rest API working fine");
})


// -------------------------------SHIFTED TO SPECIFIC ROUTER FILE - TODO ROUTER
// app.get("/todos", async (req, res) => {

//     try{
//         const todos = await Todos.find();
//         res.send(todos);
//     }catch(err){
//         res.status(500).send(err);
//     }
// })

// app.get("/todos/:id", async (req, res) => {

//     try{
//         const _id = req.params.id;
//         console.log(req.params);
//         // Todos.findById({_id : _id});
//         const todo = await Todos.findById(_id);

//         if(!todo){
//             return res.status(404).send("Data doesn't exist with given id");
//         }
//         else{
//             res.send(todo);
//         }
        
//     }catch(err){
//         res.status(500).send(err);
//     }
// })

// //--------------Using Promise method---------------
// // app.post("/todos", (req, res) => {
    
// //     console.log(req.body);
// //     const todo = new Todos(req.body);
// //     todo.save().then(() => {
// //         console.log(`Todo added`);
// //         res.status(201).send(todo);
// //     }).catch((err) => {
// //         res.status(400).send(err);
// //     })
// // })


// //----------------------using async await--------------------
// app.post("/todos", async (req, res) => {

//     try{
//         const todo = new Todos(req.body);

//         const createdTodo = await todo.save();
//         res.status(201).send(createdTodo);
//     }catch(err){
//         res.status(400).send(err.errors.title.properties.message);
//     }

// })

// app.patch("/todos/:id", async (req, res) => {

//     try{
//         const updatedTodo = await Todos.findByIdAndUpdate(req.params.id, req.body, {
//             new: true
//         });
//         res.send(updatedTodo);

//     }catch(err){
//         res.status(404).send(err);
//     }
// })

// app.delete("/todos/:id", async (req,res) => {
//     try{
//         // const id = req.params.id;
//         const deletedTodo = await Todos.findByIdAndDelete(req.params.id);
//         if(!req.params.id){
//             return res.status(404).send();
//         }
//         else{
//             res.send(deletedTodo);
//         }

//     }catch(err){
//         res.status(500).send(err);
//     }
// })

app.get("*", (req, res) => {
    res.status(404).send("Page Not Found");
})



app.listen(port, () => {
    console.log(`Listing at Port ${port}`);
})

