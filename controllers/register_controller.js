const Model = require('../models/model');
const { generateHashPassword } = require('../utils/utils')


async function registerUser(req,res) {
    const { username, email, password, confirm_password}  = req.body;
    let errors = [];
    try {
        const exist = await Model.userExist(email);
        if ( !username || !email || !password || !confirm_password ) {
           errors.push({ message: "Please fill all the fields!"});
        };
        if (exist) {
            errors.push({ message: "Please use another email!"});
        };
        if (password !== confirm_password) {
            errors.push({ message: "Password do not match!"});
        };

        if (password.length < 6) {
            errors.push({ message: "Password must be 6 and above"});
        };


        if (errors.length > 0) {
            console.log(errors)
            return res.status(401).render('register', { errors, username, email, password, confirm_password});
        };


        const hashPassword = await generateHashPassword(password);
        const newUser = {
            username,
            email,
            password: hashPassword
        };
        const result = await Model.createUser(newUser);
        console.log(result);
        req.flash('successful_register', 'Your account has been created, Login now!')
        res.redirect('/authentication/login');

    } catch (error) {
        console.log(error.message)
    };
};

module.exports = { registerUser };