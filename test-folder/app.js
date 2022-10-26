const express = require("express");
const mongoose = require("mongoose");
// const cors = require("cors");
const todosRoutes = require("./routes/todos");
const usersRoutes = require("./routes/users");
const adminRoutes = require("./routes/admin")
const authMiddleWare = require('./middleware/auth');

const app = express();
mongoose.connect("mongodb://localhost:27017/NodeLab");

app.use(express.json());
// app.use(cors());

app.use("/admin", adminRoutes);
app.use("/users", usersRoutes);
app.use("/todos", authMiddleWare);
app.use("/todos", todosRoutes);




app.use("*", (req, res, next)=>{
    res.status(404).json({error: "Not Found"});
})

app.use((err, req, res, next)=>{
    res.status(503).json({error:"Service Unavailable"});

})

app.listen(3000, ()=>{
    console.log("the app is up and running...")
})
