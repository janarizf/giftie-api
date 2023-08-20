const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name: { required: true, type: String },
    email: { required: true, type: String },
    password: { required: true, type: String },
    active: { required: true, type: Boolean }
})

module.exports = mongoose.model('admin_users', dataSchema)


