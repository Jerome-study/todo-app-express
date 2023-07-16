const bcrypt = require('bcrypt')


function generateHashPassword (password) {
    return new Promise(async (resolve,reject) => {
        try {
            const hashedPassword = await bcrypt.hash(password, 10)
            resolve(hashedPassword)
        }
        catch (error) {
            reject('Something went wrong')
        }
    })
}

function comparePassword (password, hashed) {
    return new Promise(async (resolve,reject) => {
        try {
            resolve(await bcrypt.compare(password, hashed))
        }
        catch (error) {
            reject('Something went wrong')
        }
    })
}

module.exports = { generateHashPassword, comparePassword }