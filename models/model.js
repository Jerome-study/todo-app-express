const User = require('../Schemas/user_schema');


// Check if user exist
function userExist(email) {
    return new Promise(async (resolve, reject) => {
       const user = await User.findOne({ email: email });
       resolve(user);
    })
};

function findById(id) {
    return new Promise(async (resolve, reject) => {
        const user = await User.findById(id);
        resolve(user);
     })
}

// Create User
function createUser(newUser) {
    return new Promise(async (resolve, reject) => {
       const result = await User.create(newUser);
       resolve(result);
    });
};

function createUserTodos(newUser) {
    return new Promise(async (resolve, reject) => {
       
    });
};

module.exports = { userExist, createUser, findById, createUserTodos };