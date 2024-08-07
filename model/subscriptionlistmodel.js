const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    email: { required: true, type: String },
    createdDate: { required: true, type: Date },
})

module.exports = mongoose.model('subscriptionlist', dataSchema)


