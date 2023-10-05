const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    listid: { required: true, type: String },
    originallink: { required: true, type: String },
    requestedlink: { required: true, type: String },
    linkstatus:{ required: true, type: String },
    requestedby: { required: true, type: String },
    requesteddate:  { required: true, type: Date },
    approvedby: { required: true, type: String },
    approveddate:  { required: true, type: Date }
})

module.exports = mongoose.model('list_url_request', dataSchema)