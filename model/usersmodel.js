const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    firstname:{required: true, type: String},
    lastname:{required: true, type: String},
    username:{required: true, type: String},
    email:{required: true, type: String},
    password:{required: true, type: Date},
    birthday:{required: true, type: String},
    gender:{type: Number},
    contactnumber:{type: Number},
    photo:{required: true, type: String},
    enabled:{required: true, type: Boolean},
    datejoined:{required: true, type: Date },
    createdby:{required: true, type: String},
    createddate:{required: true, type: Date },
    updatedby:{required: true, type: String},
    updateddate:{required: true, type: Date }
})

module.exports = mongoose.model('Users', dataSchema)


