const recipeModel = require("../models/RecipesModel");

    const getAllRecipes = async (req, res) =>{
    try {
        const recipes = await recipeModel.find();
        if(recipes.length===0 || recipes===null){
            return res.status(200).json({message: "No hay recetas", status: "error"})
        }else{
            res.status(200).json({message: "Consulta correcta", status: "Succes"})
        }
    } catch (error) {
        res.status(500).json({status: 'Failed', error: error.message})
    }
};

const getRecipe= async (req, res)=>{
    try {
        const id = req.params.id
        const recipe = await recipeModel.findById(id);
        if(recipe===null){
            return res.status(200).json({message: "No hay recetas", status: "error"})
        }else{
            res.status(200).json({message: "Consulta correcta", status: "Succes"})
        }
    } catch (error) {
        res.status(404).json({status: 'Failed', error: error.message})
    }
}

const lastRecipes = async (req, res)=>{
    try {
        const recipes = await recipeModel.find();
        if(recipes.length===0 || recipes===null){
            return res.status(200).json({message: "No hay recetas", status: "error"})
        }else{
            recipes = recipes.reverse().slice(0,5)
            res.status(200).json({message: recipes, status: "Succes"})
        }
    } catch (error) {
        res.status(500).json({status: 'Failed', error: error.message})
    }
}

const bestRecipes = async (req, res)=>{
    try {
        const recipes = await recipeModel.find().sort({likes:-1}).limit(5);
        if(recipes.length===0 || recipes===null){
            return res.status(200).json({message: "No hay recetas", status: "error"})
        }else{
            recipes = recipes.slice(0,5)
            res.status(200).json({message: recipes, status: "Succes"})
        }
    } catch (error) {
        res.status(500).json({status: 'Failed', error: error.message})
    }
}








module.exports = {getAllRecipes, getRecipe, lastRecipes, bestRecipes}