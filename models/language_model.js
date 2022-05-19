const mongoose = require("mongoose")
const {Schema} = mongoose;


//define schema
const languageSchema = new Schema({
    name: {type: String, required: true},
    greeting: String,
    //eg a quick brown fox
    pangram: String,
    filler: String
})

//create model with collection and export...
const Language = mongoose.model('Language', languageSchema)
module.exports = Language;