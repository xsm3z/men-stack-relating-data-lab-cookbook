const express = require('express');
const router = express.Router();
const users = require('../controllers/users.js');

router.get('/', users.index);
router.get('/:userId', users.show);

module.exports = router;
