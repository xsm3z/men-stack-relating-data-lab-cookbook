const Ingredient = require('../models/ingredient.js');

exports.index = async (req, res) => {
  try {
    const ingredients = await Ingredient.find({});
    res.render('ingredients/index.ejs', {
      ingredients: ingredients,
    });
  } catch (error) {
    res.send(error);
  }
};

exports.create = async (req, res) => {
  try {
    await Ingredient.create(req.body);
    res.redirect('/ingredients');
  } catch (error) {
    res.send(error);
  }
};
