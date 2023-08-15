const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name: { required: true, type: String },
    category_id: { required: true, type: String },
    headercolor: { required: true, type: String },
    bodycolor: { required: true, type: String },
    textcolor: { required: true, type: String },
    headerimage: { required: true, type: String },
    backgroundimage: { required: true, type: String },

})

module.exports = mongoose.model('themes', dataSchema)


