const Reservation = require('../models/reservation');

exports.createReservation = (req, res, next) => {
    delete req.body._id;
    const reservation = new Reservation({
      ...req.body
    });
    reservation.save()
      .then(() => res.status(201).json({ message: 'Reservation enregistrée !'}))
      .catch(error => res.status(400).json({ error }));

}

exports.getAllReservations = (req, res, next) => {
    Reservation.find()
    .then(reservations => res.status(200).json(reservations))
    .catch(error => res.status(400).json( {error} ));

}

exports.getOneReservation = (req, res, next) => {
   Reservation.findOne({ _id: req.params.reservationID })
    .then((reservation) => {
        if(reservation != 'null'){
            res.status(200).json(reservation)
        } else{
            throw new Error('null');        }
    })
    .catch(error => res.status(404).json({ error }));

}

exports.updateReservation = (req, res, next) => {
  Reservation.findOne({ _id: req.params.id }).then(
    (Reservation) => { 
      if (!Reservation) {
        return res.status(404).json({
          error: new Error('Reservation non trouvée !')
        });
      }
      if (Reservation.userId !== req.auth.userId) {
        return res.status(401).json({
          error: new Error('Requête non autorisée')
        });
      }
    }
  );
  Reservation.uptadeOne({_id: req.params.reservationID },
    {...req.body, _id:req.params.reservationID}).then(
    () => {
      res.status(200).json({
       message: 'Reservation modifiée !'
      });
    }
    ).catch(
      (error) => {
        res.status(400).json({ 
          error: error
         });
      }
   );
    // Reservation.updateOne({ _id: req.params.reservationID }, { ...req.body, _id: req.params.id })
    // .then(() => res.status(200).json({ message: 'Reservation modifiée !'}))
    // .catch(error => res.status(400).json({ error }));

}


exports.deleteReservation = (req, res, next) => {
    Reservation.findOne({ _id: req.params.id }).then(
        (Reservation) => { 
          if (!Reservation) {
            return res.status(404).json({
              error: new Error('Reservation non trouvée !')
            });
          }
          if (Reservation.userId !== req.auth.userId) {
            return res.status(401).json({
              error: new Error('Requête non autorisée')
            });
          }
        }
      );
      Reservation.deleteOne({_id: req.params.reservationID }).then(
        () => {
          res.status(200).json({
           message: 'Reservation supprimée !'
          });
        }
        ).catch(
          (error) => {
            res.status(400).json({ 
              error: error
             });
          }
       );
}