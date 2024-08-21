const express = require("express");
const router = express.Router();
const Recipe = require("../models/recipe.js");
const Ingredient = require("../models/ingredient.js");
const User = require("../models/user.js");

router.get("/", async (req, res) => {
  try {
    const userRecipes = await Recipe.find({ owner: req.session.user._id });
    res.render("recipes/index.ejs", {
      recipes: userRecipes,
    });
  } catch (error) {
    res.send(error);
  }
});

router.get("/new", (req, res) => {
  res.render("recipes/new.ejs");
});

router.post("/", async (req, res) => {
  try {
    req.body.owner = req.session.user._id;
    await Recipe.create(req.body);
    res.redirect(`/recipes`);
  } catch (error) {
    res.send(error);
  }
});

router.get("/:recipeId", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeId).populate(
      "ingredients"
    );
    const allIngredients = await Ingredient.find({});
    res.render("recipes/show.ejs", {
      recipe: recipe,
      allIngredients: allIngredients,
    });
  } catch (error) {
    res.send(error);
  }
});

router.get("/:recipeId/edit", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeId);
    const allIngredients = await Ingredient.find({});
    res.render("recipes/edit.ejs", {
      recipe: recipe,
      allIngredients: allIngredients,
    });
  } catch (error) {
    res.send(error);
  }
});

router.put("/:recipeId", async (req, res) => {
  try {
    const recipeToUpdate = await Recipe.findById(req.params.recipeId);
    recipeToUpdate.name = req.body.name;
    recipeToUpdate.instructions = req.body.instructions;
    const selectedIngredients = Array.isArray(req.body.ingredients)
      ? req.body.ingredients
      : [req.body.ingredients];
    recipeToUpdate.ingredients = selectedIngredients;
    await recipeToUpdate.save();
    res.redirect(`/recipes/${req.params.recipeId}`);
  } catch (error) {
    res.send("An error occurred while updating the recipe.");
  }
});

router.delete("/:recipeId", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeId);
    await recipe.deleteOne();
    res.redirect(`/recipes`);
  } catch (error) {
    res.send(error);
  }
});

router.get("/:recipeId/add-ingredients", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeId).populate(
      "ingredients"
    );
    const allIngredients = await Ingredient.find({});

    res.render("recipes/add-ingredients.ejs", {
      recipe: recipe,
      allIngredients: allIngredients,
    });
  } catch (error) {
    console.error(error);
    res.send("An error occurred while fetching data.");
  }
});

router.post("/:recipeId/ingredients", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeId);
    const ingredientIds = Array.isArray(req.body.ingredients)
      ? req.body.ingredients
      : [req.body.ingredients];
    recipe.ingredients = [
      ...new Set([...recipe.ingredients, ...ingredientIds]),
    ];
    await recipe.save();
    res.redirect(`/recipes/${req.params.recipeId}`);
  } catch (error) {
    console.error(error);
    res.send("An error occurred while updating the recipe.");
  }
});

module.exports = router;