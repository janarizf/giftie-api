const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name: {required: true, type: String},
    category_id: {required: true, type: String},
    colors: {
        header: {required: true, type: String},
        body: {required: true, type: String},
        text: {required: true, type: String},
    },
    images:
    {
        header: {required: true, type: String},
        background: {required: true, type: String},
    }
})

module.exports = mongoose.model('themes', dataSchema)


