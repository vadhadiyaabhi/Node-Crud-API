const express = require("express");
const Todos = require("../models/todos");
const router = new express.Router();


// router.get("/", (req, res) => {
//     res.send("Hii, Express router working fine");
// })

router.get("/todos", async (req, res) => {

    try{
        const todos = await Todos.find();
        res.send(todos);
    }catch(err){
        res.status(500).send(err);
    }

})

router.get("/todos/:id", async (req, res) => {

    try{
        const _id = req.params.id;
        console.log(req.params);
        // Todos.findById({_id : _id});
        const todo = await Todos.findById(_id);

        if(!todo){
            return res.status(404).send("Data doesn't exist with given id");
        }
        else{
            res.send(todo);
        }
        
    }catch(err){
        res.status(500).send(err);
    }
})

//--------------Using Promise method---------------
// app.post("/todos", (req, res) => {
    
//     console.log(req.body);
//     const todo = new Todos(req.body);
//     todo.save().then(() => {
//         console.log(`Todo added`);
//         res.status(201).send(todo);
//     }).catch((err) => {
//         res.status(400).send(err);
//     })
// })


//----------------------using async await--------------------
router.post("/todos", async (req, res) => {

    try{
        const todo = new Todos(req.body);
        console.log(req.body);
        const createdTodo = await todo.save();
        res.status(201).send(createdTodo);
    }catch(err){
        console.log(err);
        // res.status(400).send(err.errors.title.properties.message);
        res.status(400).send(err);
    }

})

router.patch("/todos/:id", async (req, res) => {

    try{
        const updatedTodo = await Todos.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        res.send(updatedTodo);

    }catch(err){
        res.status(404).send(err);
    }
})

router.delete("/todos/:id", async (req,res) => {
    try{
        // const id = req.params.id;
        const deletedTodo = await Todos.findByIdAndDelete(req.params.id);
        if(!req.params.id){
            return res.status(404).send();
        }
        else{
            res.send(deletedTodo);
        }

    }catch(err){
        res.status(500).send(err);
    }
})

// router.get("*", (req, res) => {
//     res.status(404).send("Page Not Found");
// })

module.exports = router;