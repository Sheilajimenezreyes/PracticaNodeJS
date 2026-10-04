const express = require ("express");
const { createUser, loginUser, favoriteRecipes, addRecipe, deleteRecipeForList, createRecipe, updateRecipe, deleteRecipe, editUser } = require("../controllers/UserController");
const { verifyToken, verifyAdmin } = require("../middleware/auth");
const router = express.Router()

router.post("/registerUser", createUser)
router.post("/login", loginUser)
router.get("/favorites", verifyToken, favoriteRecipes)
router.post("/user/:recipeId/favorite", verifyToken, addRecipe)
router.delete("/user/:recipeId/favorite", verifyToken, deleteRecipeForList)
router.post("/recipes", verifyAdmin, createRecipe)
router.patch("/recipes/:id", verifyAdmin, updateRecipe)
router.delete("/recipes/:id", verifyAdmin, deleteRecipe)
router.patch("/user", verifyAdmin, editUser)


module.exports = router;