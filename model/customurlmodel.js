const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    url: { required: true, type: String },
    approved: { required: true, type: Boolean },
    approvedById: { type: String },
    approvedDate: { type: Date },
    createdById: { required: true, type: String },
    createdDate: { required: true, type: Date },
    updatedById: { required: true, type: String },
    updatedDate: { required: true, type: Date }
})

module.exports = mongoose.model('customurlmodel', dataSchema)


