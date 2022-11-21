const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    user_id:{required: true, type: String},
    name:{type: String},
    private:{required: true, type: Boolean},
    type_id:{required: true, type: String},
    status_id:{required: true, type: String},
    createdby:{required: true, type: String},
    createddate:{required: true, type: Date },
    updatedby:{required: true, type: String},
    updateddate:{required: true, type: Date },
    members:[{
        user_id:{required: true, type: String},
        name:{type: String},
        email:{type: String},
        lists:[{
            list_id:{required: true, type: String},
            list:{required: true, type: String}
                }]
            }]
})

module.exports = mongoose.model('Groups', dataSchema)
