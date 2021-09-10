const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const nameSchema = new Schema({
    name: {
        type: String
    }

}, { timestamps: true });

const Name = mongoose.model('Name', nameSchema)

module.exports = Name;