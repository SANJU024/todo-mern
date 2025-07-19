const express = require("express");
const { getTodo, createTodo, updateTodo, delteTodo} = require("../controllers/todoController");
const router= express.Router();
const authenticatUser = require("../middlewares/authorization");

router.get("/todolist",authenticatUser,getTodo);
router.post("/create", authenticatUser, createTodo);
router.put("/update/:id", authenticatUser, updateTodo);
router.delete("/delete/:id", authenticatUser, delteTodo);

module.exports=router;
