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
    res.render('card_page', { user: todoCard})
   
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

router.delete('/deletecard/:slug', async (req,res) => {
    const card = await todoCardModel.findOne({ slug: req.params.slug })
    const todoUser = await todoUserModel.findOne({_id: card.user_id})
    const index = todoUser.todoCard.findIndex(card => card.slug === req.params.slug)
    const filteredArray = todoUser.todoCard.filter(card => {
        if (card.slug === req.params.slug) {
            return false
        } else {
            return true
        };
    });
   
    todoUser.todoCard = filteredArray
    await card.deleteOne({ slug: req.params.slug })
    await todoUser.save()
    res.redirect('/todo')
});




router.get('/editcard/:slug', async (req,res) => {
    const card = await todoCardModel.findOne({ slug: req.params.slug });
    const todoUser = await todoUserModel.findOne({_id: card.user_id});
    const index = todoUser.todoCard.findIndex(card => card.slug === req.params.slug);
    res.render('edit_card', {card: todoUser.todoCard[index]});
});


router.put('/editcard/:slug', async (req,res) => {
    const card = await todoCardModel.findOne({ slug: req.params.slug });
    const todoUser = await todoUserModel.findOne({_id: card.user_id});
    const index = todoUser.todoCard.findIndex(card => card.slug === req.params.slug);
    
   
    
    card.cardTitle = req.body.card_title
    todoUser.markModified('todoCard')
    
   
    await card.save()

    todoUser.todoCard[index] = card

    await todoUser.save();
    res.redirect('/todo');
});



module.exports = router;