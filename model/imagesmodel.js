const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    files_id: { type: String },
    n: { type: Number },
    data: {data: Buffer, contentType: String}
})

module.exports = mongoose.model('images.chunks', dataSchema)