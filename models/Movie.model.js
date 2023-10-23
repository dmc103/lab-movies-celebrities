const mongoose = require('mongoose');


//getting mongoose strictQuery error"
mongoose.set('strictQuery', true)


//  Add your code here
const moviesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    genre: {
        type: String,
        required: true
    },

    plot: {
        type: String,
        required: true
    },

    cast: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Celebrities'
    }]

});

const Movie = mongoose.model('Movies', moviesSchema);

module.exports = Movie;