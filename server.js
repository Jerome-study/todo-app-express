const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport')
const mongoStore = require('connect-mongo');
const { isAuth, loginAuth } = require('./middleware/isAuth');
const { createTodoUser } = require('./middleware/creatTodoUsers');
const methodOverride = require('method-override');


// Environment Variables
require("dotenv").config();



// Router

const authRouter = require('./routes/auth');
const todoRouter = require('./routes/todo');
const welcomeRouter = require('./routes/welcome');


// Database
require('./database/database');

//  Strategy
require('./controllers/strategies/local')

const app = express();





// Middlewares
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(flash());
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: mongoStore.create({
        mongoUrl: process.env.MONGODBURL
    })
}));



app.use(function(req, res, next){
    res.locals.successful_register = req.flash('successful_register');
    next();
});
app.use(passport.initialize());
app.use(passport.session());




// Routes
app.use('/welcome', welcomeRouter);



app.use('/authentication', loginAuth, authRouter);



// Middleware for Todos

app.use(isAuth);
app.use(createTodoUser);

// Routes
app.use('/todo', todoRouter);





const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);
});