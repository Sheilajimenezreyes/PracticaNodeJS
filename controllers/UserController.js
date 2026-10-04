const recipeModel = require("../models/RecipesModel")
const userModel = require("../models/UserModel")
const bcrypt = require("bcrypt")
const generateToke = require("../utils/rules")
const sendEmail = require("../services/emailServices")

const createUser = async (req, res)=>{
try {
    const{name, email, password, role, favoriteRecipes} = req.body
    const newUser = await userModel.create({
       name,
       email,
       password: await bcrypt.hash(password, 10),
       role,
       favoriteRecipes 
    })
    await sendEmail("sheilajimenezreyes24@gmail.com", "Bienvenido", `<h2> Bienvenido ${name}</h2><p>Gracias por llegar a registrarte en nuestra web de recetas</p>`)
    return res.status(200).json({status: "SUCCES", data: newUser})
} catch (error) {
  return res.status(500).json({message: error, status: "ERROR"})
}
}

const loginUser = async (req, res)=>{
  try {
    const{email, password} = req.body
    const user = await userModel.findOne({
      email
    })
    if(user===null){
      return res.status(200).json({message: "El correo no existe", status: "Error"})
    }else{
      if(!(await bcrypt.compare(password,user.password))){
        return res.status(200).json({message: "Contraseña incorrecta", status: "Error"})
      }
    }
    const payload = {
      _id:user._id,
      email: user.email
    }
    const token = generateToke(payload, false)
    const tokenRefresh = generateToke(payload, true)
    return res.status(200).json({message: "Registro exitoso", status: "Succes", data:user, token, tokenRefresh})
  } catch (error) {
    return res.status(500).json({message: error, status: "ERROR"})
  }
}

const favoriteRecipes = async (req, res)=>{
  try {
    const {_id} = req.payload
    const user = await userModel.findById(_id)
    if (!user || user.favoriteRecipes.length===0 || user.favoriteRecipes===null){
      return res.status(200).json({message: "Lista vacía", status: "Error"})
    }else{
      return res.status(200).json({status: "Succes", data:user.favoriteRecipes})
    }
  } catch (error) {
    return res.status(500).json({message: error, status: "ERROR"})
  }
  
}

const addRecipe = async (req, res)=>{
  try {
  const{recipeId} =req.params
  const recipe = await recipeModel.findById(recipeId)
  if(!recipe){
    return res.status(200).json({message: "No existe ninguna receta", status: "Error"})
  }else{
    const user = await userModel.findByIdAndUpdate(
      req.payload._id,
      {$addToSet:{favoriteRecipes: recipe._id}},
      {new:true}
    )
    res.status(200).json({data: user})
  }
  } catch (error) {
    return res.status(500).json({message: error, status: "ERROR"})
  }
}

const deleteRecipeForList = async (req, res)=>{
  try {
  const{recipeId} =req.params
  const recipe = await recipeModel.findById(recipeId)
  if(!recipe){
    return res.status(200).json({message: "No existe ninguna receta", status: "Error"})
  }else{
    const user = await userModel.findByIdAndUpdate(
      req.payload._id,
      {$pull:{favoriteRecipes: recipe._id}},
      {new:true}
    )
    return res.status(200).json({data: user})
  }
  } catch (error) {
    return res.status(500).json({message: error, status: "ERROR"})
  }
}

const createRecipe = async (req, res)=>{
  try {
    const{title, description, ingredients, category, imageUrl, difficulty, likes, creationDate} = req.body
    const newRecipe = await recipeModel.create({
      title,
      description,
      ingredients,
      category,
      imageUrl,
      difficulty,
      likes,
      creationDate
    })
    return res.status(200).json({data: newRecipe})
  } catch (error) {
    return res.status(500).json({message: error, status: "ERROR"})
  }
}

const updateRecipe = async (req, res)=>{
  try {
    const {id} = req.params
    const recipe = await recipeModel.findByIdAndUpdate(id, {$set: req.body}, {new:true, runValidators:true})
    if(!recipe){
      return res.status(200).json({message: "No existe ninguna receta", status: "Error"})
    }else{
      return res.status(200).json({data: recipe})
    }
  } catch (error) {
    return res.status(500).json({message: error, status: "ERROR"})
  }
}

const deleteRecipe = async (req, res)=>{
  try {
    const {id} = req.params
    const recipe = await recipeModel.findByIdAndDelete(id)
    if(!recipe){
      return res.status(200).json({message: "No existe ninguna receta", status: "Error"})
    }else{
      return res.status(200).json({message: "Receta eliminada"})
    }
  } catch (error) {
    return res.status(500).json({message: error, status: "ERROR"})
  }
}

  const editUser = async (req, res) => {
    try {
        console.log("ID:", req.payload._id);
        console.log("BODY:", req.body);
        const user = await userModel.findByIdAndUpdate(
            req.payload._id,
            { $set: req.body },
            { new: true, runValidators: true }
        );
        if (!user) {
            return res.status(404).json({
                message: "No existe ningún usuario",
                status: "ERROR"
            });
        }
        return res.status(200).json({ data: user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: error.message,
            status: "ERROR"
        });
    }
};
 

module.exports = {createUser, loginUser, favoriteRecipes, addRecipe, deleteRecipeForList, createRecipe, updateRecipe, deleteRecipe, editUser}