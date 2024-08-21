const express = require('express');
const router = express.Router();
const ingredients = require('../controllers/ingredients.js');

router.get('/', ingredients.index);
router.post('/', ingredients.create);

module.exports = router;
