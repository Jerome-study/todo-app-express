const { todoUserModel } = require('../Schemas/todo_schema')


async function createTodoUser(req,res,next) {
    const { user } = req
    const found = await todoUserModel.findById(req.user.id)
    
    if (!found) {
        const newUser = new todoUserModel({
            _id: user.id,
            todoCard: [],
            slug: user.slug
        })

        await newUser.save();
        return next()
    }

    next();
}

module.exports = {
    createTodoUser
}