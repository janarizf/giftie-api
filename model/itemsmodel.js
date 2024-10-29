const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    listId: { required: true, type: String },
    name: { required: true, type: String },
    website: { type: String },
    links: [{ type: String }],
    categoryId: { type: String },
    image: [{ type: String }],
    description: { type: String },
    price: { type: Number },
    quantity: { type: Number },
    unlimited: { type: Boolean },
    reserved: { type: Boolean },
    reservedBy: [{
        userId: { type: String }
    }],
    createdById: { required: true, type: String },
    createdDate: { required: true, type: Date },
    updatedById: { required: true, type: String },
    updatedDate: { required: true, type: Date }
})

module.exports = mongoose.model('items', dataSchema)


