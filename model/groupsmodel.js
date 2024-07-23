const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    owner_id: { required: true, type: String },
    owner: { required: true, type: String },
    groupname: { type: String },
    image:{type: String},
    private: { required: true, type: Boolean },
    type: { required: true, type: String },
    status: { required: true, type: String },
    createdby: { required: true, type: String },
    createddate: { required: true, type: Date },
    updatedby: { required: true, type: String },
    updateddate: { required: true, type: Date },
    members: [{
        user_id: { required: true, type: String },
        name: { type: String },
        email: { type: String },
    }],
    invited: [{
        email: { required: true, type: String },
        accepted: { required: true, type: Boolean }
    }],
    lists: [{ required: true, type: String }]
})

module.exports = mongoose.model('groups', dataSchema)
