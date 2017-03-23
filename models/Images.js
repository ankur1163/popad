var mongoose = require('mongoose');

var ImagesSchema = new mongoose.Schema({
    username:{type:String},
    myimages: [{
        img: String,
        hearts: Number,
        title: String
    }],
    thosewhovoted:{type:Array,default:[]}
   
 
});

module.exports = mongoose.model('ImagesSchema', ImagesSchema);