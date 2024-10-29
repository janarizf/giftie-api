const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    category:{required: true, type: String},
    private: { required: true, type: Boolean },
    active: { required: true, type: Boolean },
    theme: {required: true, type: String},
    image: {required: true, type: String}
})

module.exports = mongoose.model('listcategories', dataSchema)



