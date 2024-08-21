const Recipe = require('../models/recipe.js');
const Ingredient = require('../models/ingredient.js');

exports.index = async (req, res) => {
  try {
    const userRecipes = await Recipe.find({ owner: req.session.user._id });
    res.render('recipes/index.ejs', {
      recipes: userRecipes,
    });
  } catch (error) {
    res.send(error);
  }
};

exports.new = (req, res) => {
  res.render('recipes/new.ejs');
};

exports.create = async (req, res) => {
  try {
    req.body.owner = req.session.user._id;
    await Recipe.create(req.body);
    res.redirect('/recipes');
  } catch (error) {
    res.send(error);
  }
};

exports.show = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeId).populate('ingredients');
    const allIngredients = await Ingredient.find({});
    res.render('recipes/show.ejs', {
      recipe: recipe,
      allIngredients: allIngredients,
    });
  } catch (error) {
    res.send(error);
  }
};

exports.edit = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeId);
    const allIngredients = await Ingredient.find({});
    res.render('recipes/edit.ejs', {
      recipe: recipe,
      allIngredients: allIngredients,
    });
  } catch (error) {
    res.send(error);
  }
};

exports.update = async (req, res) => {
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
    res.send('An error occurred while updating the recipe.');
  }
};

exports.delete = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeId);
    await recipe.deleteOne();
    res.redirect('/recipes');
  } catch (error) {
    res.send(error);
  }
};

exports.addIngredients = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeId).populate('ingredients');
    const allIngredients = await Ingredient.find({});
    res.render('recipes/add-ingredients.ejs', {
      recipe: recipe,
      allIngredients: allIngredients,
    });
  } catch (error) {
    console.error(error);
    res.send('An error occurred while fetching data.');
  }
};

exports.addIngredientsToRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeId);
    const ingredientIds = Array.isArray(req.body.ingredients)
      ? req.body.ingredients
      : [req.body.ingredients];
    recipe.ingredients = [...new Set([...recipe.ingredients, ...ingredientIds])];
    await recipe.save();
    res.redirect(`/recipes/${req.params.recipeId}`);
  } catch (error) {
    console.error(error);
    res.send('An error occurred while updating the recipe.');
  }
};
