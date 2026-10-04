const express = require ("express");
const { getAllRecipes, getRecipe, lastRecipes, bestRecipes } = require("../controllers/RecipesController");
const router = express.Router();

router.get("/recipes", getAllRecipes)
router.get("/recipes/:id", getRecipe)
router.get("/recent_recipes", lastRecipes)
router.get("/popular_recipes", bestRecipes)

module.exports = router;