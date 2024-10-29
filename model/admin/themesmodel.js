const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    theme: { required: true, type: String },
    description: {type: String},
    category_id: {required: true, type: String },
    headercolor: {type: String },
    bodycolor: {type: String },
    textcolor: {type: String },
    backgroundimage: { required: true, type: String },
    private: { required: true, type: Boolean },
    active: { required: true, type: Boolean },
  
})

module.exports = mongoose.model('themes', dataSchema)


