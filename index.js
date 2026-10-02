require("dotenv").config();
const express = require("express");
const cors = require("cors");
const userRouter = require("./router/UserRouter")
const connectToDataBase = require ("./bd/Connect");
connectToDataBase();
const PORT = Number(process.env.PORT || 3000);
const app = express();
app.use(express.json());
app.use(cors({
    origin:"http://localhost:5173", 
    methods:["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders:["Content-Type","auth-token"],
}));

app.use("/user", userRouter)



app.listen(PORT, ()=>{
    console.log("Escuchando en el puerto"+ PORT)
});
