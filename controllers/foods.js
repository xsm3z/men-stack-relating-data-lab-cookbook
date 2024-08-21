const User = require('../models/user.js');

exports.index = async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    res.render('foods/index.ejs', {
      pantry: currentUser.pantry,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
};

exports.new = (req, res) => {
  res.render('foods/new.ejs');
};

exports.create = async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    currentUser.pantry.push(req.body);
    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/foods`);
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
};

exports.edit = async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const food = currentUser.pantry.id(req.params.foodId);
    res.render('foods/edit.ejs', {
      food: food,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
};

exports.update = async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const food = currentUser.pantry.id(req.params.foodId);
    food.set(req.body);
    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/foods/`);
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
};

exports.delete = async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    currentUser.pantry.id(req.params.foodId).deleteOne();
    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/foods`);
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
};
