require("dotenv").config();
const express = require("express");
const cors = require("cors");
const userRouter = require("./router/UserRouter");
const recipeRouter = require("./router/RecipesRouter");
const tokenRouter = require("./router/TokenRouter");
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

app.use("/", userRouter)
app.use("/", recipeRouter);
app.use("/", tokenRouter)

app.listen(PORT, ()=>{
    console.log("Escuchando en el puerto"+ PORT)
});
