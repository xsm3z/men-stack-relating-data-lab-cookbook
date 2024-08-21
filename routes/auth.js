const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth.js');

router.get('/sign-up', auth.showSignUp);
router.post('/sign-up', auth.handleSignUp);
router.get('/sign-in', auth.showSignIn);
router.post('/sign-in', auth.handleSignIn);
router.get('/sign-out', auth.handleSignOut);

module.exports = router;
