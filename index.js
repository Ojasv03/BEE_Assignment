const express = require("express");
const connectDB = require("./db/connectDB");
const app = express();
require("dotenv").config();
const path = require("path");

const todoRouter = require("./routes/todo.routes")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,"public")));

app.use("/todo",todoRouter);

app.get("/", (req,res)=>{   });

connectDB().then(()=>{
  app.listen(3000 , ()=>{
    console.log("server is running on port 3000");
})  
}).catch((error)=>console.log(error))


