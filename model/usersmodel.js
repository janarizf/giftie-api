const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    firstname:{required: true, type: String},
    lastname:{required: true, type: String},
    username:{required: true, type: String},
    email:{required: true, type: String},
    password:{ type: String},
    birthday:{type: Date},
    gender:{type: Number},
    contactnumber:{type: Number},
    photo:{type: String},
    enabled:{required: true, type: Boolean},
    datejoined:{required: true, type: Date },
    createdby:{required: true, type: String},
    createddate:{required: true, type: Date },
    updatedby:{required: true, type: String},
    updateddate:{required: true, type: Date }
})

module.exports = mongoose.model('Users', dataSchema)


