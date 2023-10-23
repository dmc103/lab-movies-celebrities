
const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie.model');
const Celebrity = require('../models/Celebrity.model');


// all your routes here

router.get('/create', (req, res) => {
    Celebrity.find() // fetching the list of all the celebrities
    .then((celebrities) => {  //then render the form, passing the list of celebrities to the view
        res.render('movies/new-movie', {celebrities});
    })
    .catch(error => {
        console.log('Something went wrong:', error);
    
    })
});

router.post('/create', (req, res) => {
    console.log(req.body);
    Movie.create(req.body)
    .then(() => {
        res.redirect('/movies');
    })
    .catch(error => {
        console.log('Something went wrong:', error);
        res.render('movies/new-movie', { errorMessage: "Error creating a new movie"});
    });

});


router.get('/movies', (req, res) => {
    Movie.find()
    .then((allmovies) => {
        res.render('movies/movies', {movies: allmovies});
    })
    .catch(error => {
        console.log('Something went wrong:', error);
    
    })

});


router.get('/movies/:movieId', (req, res) => {
    const {movieId} = req.params;
    Movie.findById(movieId)
    .populate('cast')
    .then((movie) => {
        res.render('movies/movie-details', {movie});
    })
    .catch(error => {
        console.log('Error retreiving movie details:', error);
    
    })

});




module.exports = router;

