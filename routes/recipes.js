const express = require('express');
const router = express.Router();
const recipes = require('../controllers/recipes.js');

router.get('/', recipes.index);
router.get('/new', recipes.new);
router.post('/', recipes.create);
router.get('/:recipeId', recipes.show);
router.get('/:recipeId/edit', recipes.edit);
router.put('/:recipeId', recipes.update);
router.delete('/:recipeId', recipes.delete);
router.get('/:recipeId/add-ingredients', recipes.addIngredients);
router.post('/:recipeId/ingredients', recipes.addIngredientsToRecipe);

module.exports = router;
