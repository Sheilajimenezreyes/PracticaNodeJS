const mongo = require("mongoose");
const Schema = mongo.Schema;

const recipeSchema = new Schema({
    title: {
        type: String,
        required: [true, "El nombre es obligatorio"],
        minlength: [7, "Al menos 7 caracteres"],
        maxlength: [20, "Maximo 20 caracteres"]
    },
    description:{
        type: String,
        required: [true, "La descripcion es obligatoria"],
        minlength: [20, "Al menos 20 caracteres"],
        maxlength: [100, "Maximo 100 caracteres"]
    },
    ingredients:{
        type: [String],
        required: [true, "La descripcion es obligatoria"]
    },
    category:{
        type: String,
        required: [true, "Añadir la categoria es obligatorio"]
    },
    imageUrl:{
        type: String
    },
    difficulty:{
        type: String,
        enum: {
            values: ["Facil", "Medio", "Dificil"],
            message: "La categoria no es válida"
        }
    },
    likes:{
        type: [Schema.Types.ObjectId],
        ref:"User",
        default: []
    },
    creationDate:{
        type: Date,
        required: [true, "La fecha de creación es obligatoria"],
        default: Date.now
    }
})

const recipeModel = mongo.model("Recipe", recipeSchema, "Recipe")
module.exports = recipeModel;