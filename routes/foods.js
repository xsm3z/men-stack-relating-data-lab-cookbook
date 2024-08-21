const express = require('express');
const router = express.Router();
const foods = require('../controllers/foods.js');

router.get('/', foods.index);
router.get('/new', foods.new);
router.post('/', foods.create);
router.get('/:foodId/edit', foods.edit);
router.put('/:foodId', foods.update);
router.delete('/:foodId', foods.delete);

module.exports = router;
