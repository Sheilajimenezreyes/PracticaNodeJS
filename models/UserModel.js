const mongo = require("mongoose");
const Schema = mongo.Schema;

const userSchema = new Schema({
    name:{
        type: String,
        required: [true, "El nombre de Usuario es obligatorio"],
        minlength: [3, "Al menos 3 caracteres"],
        maxlength: [15, "Maximo 15 caracteres"]
    },
    email:{
        type: String,
        required: [true, "El email del Usuario es obligatorio"],
        unique: true,
        trim: true
    },
    password:{
        type: String,
        required: [true, "La contraseña es obligatoria"],
        minlength: [5, "La contraseña debe tener al menos 5 caracteres"],
    },
    role:{
        type: String,
        enum:{
            values: ["Admin", "User"],
            message:"El rol es inválido"
        }
    },
    favoriteRecipes:{
        type: [Schema.Types.ObjectId],
        ref: "Recipe"
    },
})

const userModel = mongo.model("User", userSchema, "User")
module.exports = userModel;