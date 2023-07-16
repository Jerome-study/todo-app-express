const express = require('express');
const crypto = require('crypto')
const { todoUserModel, todoListModel, todoCardModel } = require('../Schemas/todo_schema');
const router = express.Router();


router.get('/' , async (req,res) => {

    try {
        const todoUserInfo = await todoUserModel.findById(req.user._id)
        res.render('todo', {user: req.user, todoCards: todoUserInfo.todoCard});
    } catch (error) {

    }
});

// View Todo Card
router.get('/viewCard/:slug', async (req,res) => {
    const { slug } = req.params   
    const todoCard = await todoCardModel.findOne({ slug: slug})
    res.render('card_page', { card: todoCard})
   
});







// Create Card
router.get('/addCard/:slug', async (req,res) => {
    const { slug } = req.params
    res.render('create_card', { slug: slug})

});

router.post('/createCard/:slug', async (req,res) => {
    const { slug } = req.params
    const { card_title } = req.body

    const user = await todoUserModel.findOne({ slug: slug })
    const newCard = new todoCardModel({
        cardTitle: card_title,
        user_id: user._id,
        todos: [],
    })
   await newCard.save()
   user.todoCard.push(newCard)
   await user.save()
   res.status(200).redirect('/todo')
});




// Edit Card

router.get('/editcard/:slug', async (req,res) => {
    // Find Card
    const card = await todoCardModel.findOne({ slug: req.params.slug });
    // Find Card in Todo User
    const todoUser = await todoUserModel.findOne({_id: card.user_id});
    // Find Index card in Todo User
    const index = todoUser.todoCard.findIndex(card => card.slug === req.params.slug);
    res.render('edit_card', {card: todoUser.todoCard[index]});
});


router.put('/editcard/:slug', async (req,res) => {
    try {
        // Find Card
        const card = await todoCardModel.findOne({ slug: req.params.slug });
        // Find Card in Todo User
        const todoUser = await todoUserModel.findOne({_id: card.user_id});
        // Find Index card in todo user
        const index = todoUser.todoCard.findIndex(card => card.slug === req.params.slug);
        
        // Update the card title in card Model
        card.cardTitle = req.body.card_title
        await card.save()

        // Update the card in todo user
        todoUser.markModified('todoCard')
        todoUser.todoCard[index] = card
        await todoUser.save();

        // Redirect
        res.redirect('/todo');
    } catch (error) {

    }
    
});

// Delete Card

router.delete('/deletecard/:slug', async (req,res) => {
    // Find Card
    const card = await todoCardModel.findOne({ slug: req.params.slug });
    // Find Card in Todo User
    const todoUser = await todoUserModel.findOne({_id: card.user_id});
    // Find index of Card in Todo User
    const index = todoUser.todoCard.findIndex(card => card.slug === req.params.slug);

    // Delete the Card in Todo User
    const filteredArray = todoUser.todoCard.filter(card => {
        if (card.slug === req.params.slug) {
            return false
        } else {
            return true
        };
    });
    todoUser.todoCard = filteredArray;
    await todoListModel.deleteMany({ card_id: card._id})
    // Delete the Card in Card Model and Save
    await card.deleteOne({ slug: req.params.slug });
    // Save the Todo User
    await todoUser.save();
    res.redirect('/todo');
});


// Todo Items

router.post('/addTodoItem/:slug', async (req,res) => {
    // Find Card
    const card = await todoCardModel.findOne({ slug: req.params.slug });
    // Find Card in Todo User
    const todoUser = await todoUserModel.findOne({_id: card.user_id});
    // Find index of Card in Todo User
    const index = todoUser.todoCard.findIndex(card => card.slug === req.params.slug);

    const newTodoItem = new todoListModel({
        todoTitle: req.body.todo_item,
        card_id: card.id
    })

    await newTodoItem.save();

    card.todos.push(newTodoItem);
    todoUser.todoCard[index].todos.push(newTodoItem);
    
    await card.save();
    todoUser.markModified('todoCard')
    await todoUser.save();

    res.redirect(`/todo/viewCard/${card.slug}`)
});

router.delete('/deleteTodoItem/:slug', async (req,res) => {
    // Find Todo Item in List
    const todoItem = await todoListModel.findOne({ slug: req.params.slug})
    
    // Find Card 
    const card = await todoCardModel.findById(todoItem.card_id)

    // Find Todo Index in Card
    const todoIndex = card.todos.findIndex(card => card.slug === todoItem.slug)

    // Find Todo User
    const todoUser = await todoUserModel.findOne({_id: card.user_id});

    // Find index of Card in Todo User
    const cardIndex = todoUser.todoCard.findIndex(c => c.slug === card.slug );
    
    // Delete todo Item In Card
    const filteredArray = card.todos.filter(todo => {
        if (todo.slug === req.params.slug) {
            return false 
        } else {
            return true
        };
    });
    card.todos = filteredArray

    // Delete todo Item In Todo User
    todoUser.todoCard[cardIndex].todos = filteredArray;
    todoUser.markModified('todoCard')

    // Save
    await todoItem.deleteOne({ slug: req.params.slug });
    await todoUser.save();
    await card.save();
   
    res.redirect(`/todo/viewCard/${card.slug}`)
});

module.exports = router;