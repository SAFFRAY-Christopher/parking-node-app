const mongoose = require('mongoose');

const reservationSchema = mongoose.Schema ({

    parkingId: { type: String, required: true },
    userId: { type: String, required: true },
    checkin: { type: String, required: true },
    checkout: { type: String, required: true },
   
});

module.exports = mongoose.model('Reservation', reservationSchema);