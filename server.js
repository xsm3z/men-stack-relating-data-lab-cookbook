const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const session = require('express-session');

const isSignedIn = require('./middleware/is-signed-in.js');
const passUserToView = require('./middleware/pass-user-to-view.js');
const authRoutes = require('./routes/auth.js');
const usersRoutes = require('./routes/users.js');
const foodsRoutes = require('./routes/foods.js');
const recipesRoutes = require("./routes/recipes.js");
const ingredientsRoutes = require("./routes/ingredients.js");

const port = process.env.PORT ? process.env.PORT : '3001';

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
// app.use(morgan('dev'));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index.ejs', {
    user: req.session.user,
  });
});

app.use(passUserToView);
app.use('/auth', authRoutes);
app.use(isSignedIn);
app.use('/users', usersRoutes);
app.use('/users/:userId/foods', foodsRoutes);
app.use("/recipes", recipesRoutes);
app.use("/ingredients", ingredientsRoutes);

app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});
