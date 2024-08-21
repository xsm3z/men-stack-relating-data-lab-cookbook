const express = require("express");
const router = express.Router();
const Ingredient = require("../models/ingredient.js");

router.get("/", async (req, res) => {
  try {
    const ingredients = await Ingredient.find({});
    res.render("ingredients/index.ejs", {
      ingredients: ingredients,
    });
  } catch (error) {
    res.send(error);
  }
});

router.post('/', async (req, res) => {
    try {
        await Ingredient.create(req.body);
        res.redirect('/ingredients');
    } catch (error) {
        res.send(error);
    }
});


module.exports = router;