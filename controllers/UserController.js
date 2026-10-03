const userModel = require("../models/UserModel")
const bcrypt = require("bcrypt")

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
    return res.status(200).json({message: "Registro exitoso", status: "Succes", data:user})
  } catch (error) {
    return res.status(500).json({message: error, status: "ERROR"})
  }
}


module.exports = {createUser, loginUser}