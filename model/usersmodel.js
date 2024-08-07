const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    firstName: { required: true, type: String },
    lastName: { required: true, type: String },
    userName: { required: true, type: String },
    bio: { type: String },
    email: { required: true, type: String },
    password: { type: String },
    birthday: { type: Date },
    gender: { type: Number },
    contactNumber: { type: Number },
    photo: { type: String },
    accountType: { type: String},
    enabled: { required: true, type: Boolean },
    dateJoined: { required: true, type: Date },
    createdBy: { required: true, type: String },
    createdDate: { required: true, type: Date },
    updatedBy: { required: true, type: String },
    updatedDate: { required: true, type: Date }
})

module.exports = mongoose.model('users', dataSchema)


