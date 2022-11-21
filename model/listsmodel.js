const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name:{required: true, type: String},
    user_id:{required: true, type: String},
    status_id:{required: true, type: String},
    category_id:{required: true, type: String},
    introduction:{type: String},
    location:{type: String},
    set_date:{required: true, type: Date},
    views:{type: Number},
    received:{type: Number},
    createdby:{required: true, type: String},
    createddate:{required: true, type: Date },
    updatedby:{required: true, type: String},
    updateddate:{required: true, type: Date },
    items:[{
        list_id:{required: true, type: String},
        name:{required: true, type: String},
        website:{type: String},
        category_id	:{type: String},
        image:{type: String},
        note:{type: String},
        price:{type: Number},
        quantity:{type: Number},
        unlimited:{type: Boolean}
            }]
})

module.exports = mongoose.model('Lists', dataSchema)


