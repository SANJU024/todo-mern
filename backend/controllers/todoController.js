const db = require("../config/db");
const todoModel = require("../models/todoModel");

const createTodo = (req, res)=>{
    const {task} = req.body;
    const userId = req.user.id;

    if(!task){
        return res.status(400).json({msg:"Task is required"});
    }
    try{
        todoModel.createTodo(task,userId,(err, result)=>{
            if(err) return res.status(500).json({msg:"DataBase error", error: err});
            res.status(201).json({msg:"Todo created", todoId: result.insertId});
        })
    }catch(err){
        res.status(500).json({msg:err.message})
    }
}

const getTodo = (req,res)=>{
    const userId=req.user.id;
    try{
        todoModel.getTodos(userId,(err,results)=>{
            if(err) return res.status(500).json({msg:"Database error",error:err});
            res.status(200).json(results);
        });
    }catch(err){
        res.status(500).json({msg:err.message})
    }
};

const updateTodo = (req,res)=>{
    const {id}=req.params;
    const {task} = req.body;
    const userId = req.user.id;

    try{

        todoModel.updateTodo(task,id, userId,(err,result)=>{
            if(err){
                return res.status(500).json({msg:"DataBase Error", error:err})
            }
            if(result.affectedRows === 0){
                return res.status(404).json({msg:"Todo not found or  not authorized"});
            }
            res.status(200).json({msg:"Todo Updated"});
        })
    }catch(err){
        res.status(500).json({msg:err.message})
    }
}

const delteTodo = (req,res)=>{
    const id = req.params.id;
    const userId = req.user.id;

    try{

        todoModel.deleteTodo(id,userId,(err,result)=>{
            if(err){
                return res.status(500).json({msg:"Database_Error",error:err})
            }
            if(result.affectedRows===0){
                return res.status(404).json({msg:"Todo not found"});
            }
            res.status(200).json({msg:"Todo Deleted"});
        });
    }catch(err){
        res.status(500).json({msg:err.message})
    }
};


module.exports={
    createTodo,
    getTodo,
    updateTodo,
    delteTodo,
};