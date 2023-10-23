const mongoose = require('mongoose');


//getting mongoose strictQuery error"
mongoose.set('strictQuery', true)


//  Add your code here
const celebritiesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    occupation: {
        type: String,
        required: true
    },

    catchPhrase: {
        type: String,
        required: true
    }

});

const Celebrities = mongoose.model('Celebrities', celebritiesSchema);

module.exports = Celebrities;
