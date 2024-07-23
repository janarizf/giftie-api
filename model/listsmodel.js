const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name: { required: true, type: String },
    image: [{type: String}],
    groupIds: [{type: String}],
    userId: { required: true, type: String },
    statusId: { type: String },
    categoryId: { required: true, type: String },
    description: { type: String },
    location: { type: String },
    eventDate: { type: Date },
    views: { type: Number },
    received: { type: Number },
    themes: { type: String },
    private: {type: Boolean},
    url: { type: String },
    followers:[{
        userId: { type: String }
    }],
    createdById: { required: true, type: String },
    createdDate: { required: true, type: Date },
    updatedById: { required: true, type: String },
    updatedDate: { required: true, type: Date }    
})

module.exports = mongoose.model('lists', dataSchema)


