const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({    
    listId: { required: true, type: String },
    name: { required: true, type: String },
    image: [{
        id: { type: String },
        filename: { type: String }
    }],
    description: { type: String },
    amount: { type: Number },   
    reserved: { type: Boolean },
    reservedBy: [{
        userId: { type: String }
    }],
    createdBy: { required: true, type: String },
    createdDate: { required: true, type: Date },
    updatedBy: { required: true, type: String },
    updatedDate: { required: true, type: Date }
})

module.exports = mongoose.model('cash', dataSchema)


