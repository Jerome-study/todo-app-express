const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Model = require('../../models/model');
const { comparePassword } = require('../../utils/utils');


passport.serializeUser((user,done) => {

    done(null, user._id);
});

passport.deserializeUser( async (id,done) => {
    try {
        const user = await Model.findById(id);
        done(null, user)
    } catch (error) {
    }
});



passport.use( new LocalStrategy({
    usernameField: 'email',
}, async (email,password,done) => {
    try {
        // Check if user exist
        const user = await Model.userExist(email);
        if (!user) {
            console.log('User not found!');
            return done(null, false, { message: "User not found"});
        } 

        // Check if password is matched
        const isPasswordMatched = await comparePassword(password, user.password);
        if (user.email !== email || !isPasswordMatched) {
            console.log('Wrong password');
            return done(null, false, { message: "Password or Email is incorrect!"});
        } 
            
        // If all credential is correct
        console.log('You are now logged In!')
        return done(null, user)

    } catch(error) {
        return done(null, false, { type:'signUpMessage', message: "Something went wrong!"})
    }
    
}
));

