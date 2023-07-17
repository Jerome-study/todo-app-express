const express = require('express');
const router = express.Router();
const passport = require('passport')
// Register Controller
const { registerUser, loginUser } = require('../controllers/register_controller')



// Authentication welcome page
router.get('/', (req,res) => {
    res.render('authentication');
});

// Login Page
router.get('/login',  async (req,res) => {
    res.render('login', { message: req.flash('error')});
});

router.post('/login',passport.authenticate('local', {
    successRedirect: '/todo',
    failureRedirect: '/authentication/login',
    failureFlash: true,
}));



// Register Page
router.get('/register', (req,res) => {
    const { username, email, password, confirm_password}  = req.body;
    let errors = [];
    res.render('register', { errors, username, email, password, confirm_password});
});

router.post('/register', (req,res) => {
    registerUser(req,res);
});

// Logout




module.exports = router;