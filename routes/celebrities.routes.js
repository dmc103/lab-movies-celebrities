const express = require('express');
const router = express.Router();
const Celebrity = require('../models/Celebrity.model');




// all your routes here
router.get('/create', (req, res) => {
    res.render('celebrities/new-celebrity');
});

router.post('/create', (req, res) => {
    console.log(req.body);
    Celebrity.create(req.body)
    .then(() => {
        res.redirect('/celebrities');
    })
    .catch(error => {
        console.log('Something went wrong:', error);
        res.render('celebrities/new-celebrity', { errorMessage: "Error creating the celebrity"});
    });

});


router.get('/celebrities', (req, res) => {
    Celebrity.find()
    .then((celebrities) => {
        res.render('celebrities/celebrities', {celebrities});
    })
    .catch(error => {
        console.log('Something went wrong:', error);
    
    })

});






module.exports = router;