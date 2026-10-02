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

module.exports = {createUser}