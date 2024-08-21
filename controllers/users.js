const User = require('../models/user.js');

exports.index = async (req, res) => {
  try {
    const allUsers = await User.find();
    res.render('users/index.ejs', { allUsers });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
};

exports.show = async (req, res) => {
  try {
    const pageOwner = await User.findById(req.params.userId);
    res.render('users/show.ejs', {
      pageOwner
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
};
