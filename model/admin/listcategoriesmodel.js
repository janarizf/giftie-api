const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    category:{required: true, type: String},
    private: { required: true, type: Boolean },
    active: { required: true, type: Boolean },
})

module.exports = mongoose.model('listcategories', dataSchema)



