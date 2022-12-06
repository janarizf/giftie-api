const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    image: String
})

module.exports = mongoose.model('FileUpload', dataSchema)