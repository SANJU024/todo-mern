const express = require('express');
const cors = require("cors");

const app = express();

const authRoutes=require("./routes/auth")
const todoRoutes=require("./routes/todoRoutes");
//middlewares
app.use(cors());
app.use(express.json());

app.use("/api/auth",authRoutes);
app.use("/api/todo",todoRoutes);

module.exports=app;