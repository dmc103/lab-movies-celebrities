
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


router.get('/:id', (req, res) => {
    const {id} = req.params;
    Movie.findById(id)
    .populate('cast')
    .then((movie) => {
        res.render('movies/movie-details', {movie});
    })
    .catch(error => {
        console.log('Error retreiving movie details:', error);
    
    })

});


router.post('/:id/delete', (req, res) => {
    const {id} = req.params;
    Movie.findByIdAndRemove(id)
    .then(() => {
        res.redirect('/movies');
    })
    .catch(error => {
        console.log('Error deleting movie:', error);
    
    })

});



router.get('/:id/edit', (req, res) => {
    console.log("Edit route accessed");
    const {id} = req.params;
    Movie.findById(id)
    .then((movie) => {
        Celebrity.find()

        .then((celebrities) => {
            celebrities.forEach(celebrity => {
                celebrity.selected = movie.cast.includes(celebrity._id.toString());
            });
            res.render('movies/edit-movie', {movie, celebrities});
        })
        .catch(error => {
            console.log('Error retreiving celebrities:', error);
        
        })
    })
    .catch(error => {
        console.log('Error retreiving movie details:', error);
    
    })

})


router.post('/:id', (req, res) => {
    const {id} = req.params;
    const {title, genre, plot, cast} = req.body;

    Movie.findByIdAndUpdate(id, {title, genre, plot, cast}, {new: true})
    .then((updatedMovie) => {
        res.redirect(`/movies/${id}`);
    })
    .catch(error => {
        console.log('Error updating movie:', error);
        res.render('movies/edit-movie',{movie: req.body, errorMessage: 'Error updating movie'});
    
    })



})




module.exports = router;

