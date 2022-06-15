const mongoose = require('mongoose');

const parkingSchema = mongoose.Schema({
    name: { type: String, required: true},
    city: { type: String, required: true},
});

module.exports = mongoose.model('Parking', parkingSchema);




