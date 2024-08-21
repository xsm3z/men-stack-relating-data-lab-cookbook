const bcrypt = require('bcrypt');
const User = require('../models/user.js');

exports.showSignUp = (req, res) => {
  res.render('auth/sign-up.ejs');
};

exports.handleSignUp = async (req, res) => {
  try {
    const userInDatabase = await User.findOne({ username: req.body.username });
    if (userInDatabase) {
      return res.send('Username already taken.');
    }

    if (req.body.password !== req.body.confirmPassword) {
      return res.send('Password and Confirm Password must match');
    }

    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    req.body.password = hashedPassword;

    await User.create(req.body);

    res.redirect('/auth/sign-in');
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
};

exports.showSignIn = (req, res) => {
  res.render('auth/sign-in.ejs');
};

exports.handleSignIn = async (req, res) => {
  try {
    const userInDatabase = await User.findOne({ username: req.body.username });
    if (!userInDatabase) {
      return res.send('Login failed. Please try again.');
    }
    const validPassword = bcrypt.compareSync(
      req.body.password,
      userInDatabase.password
    );
    if (!validPassword) {
      return res.send('Login failed. Please try again.');
    }

    req.session.user = {
      username: userInDatabase.username,
      _id: userInDatabase._id
    };

    res.redirect('/');
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
};

exports.handleSignOut = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};
