const express = require ("express");
const { getAllRecipes, getRecipe, lastRecipes, bestRecipes } = require("../controllers/RecipesController");
const router = express.Router();

router.get("/allRecipes", getAllRecipes)
router.get("/recipe/:id", getRecipe)
router.get("/lastRecipes", lastRecipes)
router.get("/bestRecipes", bestRecipes)

module.exports = router;