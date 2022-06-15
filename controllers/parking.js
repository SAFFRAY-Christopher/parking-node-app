const Parking = require ('../models/parking');

const {getRoleUser} = require('./user')

exports.createParking = (req, res, next) => {

  getRoleUser(req.auth.userId)
  .then(role => {
    if(role !== "ADMIN"){
        return res.status(401).json({
        error: new Error('Requête non autorisée')
      });
    }
  })
  delete req.body._id;
  const parking = new Parking({
    ...req.body
  });
    parking.save()
      .then(() => res.status(201).json({ message: 'Parking enregistré !'}))
      .catch(error => res.status(400).json({ error }));

}

exports.getAllParkings = (req, res, next) => {
    Parking.find()
    .then(parkings => res.status(200).json(parkings))
    .catch(error => res.status(400).json( {error} ));

}

exports.getOneParking = (req, res, next) => {
    Parking.findOne({ _id: req.params.parkingID})
    .then(parking => {
            if(parking != 'null'){
                res.status(200).json(parking)
            } else{
                throw new Error('null');        }
            })
    .catch(error => res.status(404).json({ error }));

}

exports.updateParking = (req, res, next) => {

  getRoleUser(req.auth.userId)
  .then(role => {
    if(role !== "ADMIN"){
        return res.status(401).json({
        error: new Error('Requête non autorisée')
      });
    }
  })


  Parking.findOne({ _id: req.params.parkingID }).then(
    (Parking) => { 
      if (!Parking) {
        return res.status(404).json({
          error: new Error('Parking non trouvée !')
        });
      }
    });

  Parking.updateOne({_id: req.params.parkingID}, {...req.body, _id:req.params.parkingID})
    .then(
      () => {
        return res.status(200).json({
        message: 'Parking modifiée !'
        });
    })
    .catch(
      (error) => {
        return res.status(400).json({ 
          error: error
         });
      });

}


exports.deleteParking = (req, res, next) => {

  getRoleUser(req.auth.userId)
  .then(role => {
    if(role !== "ADMIN"){
        return res.status(401).json({
        error: new Error('Requête non autorisée')
      });
    }
  })


  Parking.findOne({ _id: req.params.parkingID }).then(
    (Parking) => { 
      if (!Parking) {
        return res.status(404).json({
          error: new Error('Parking non trouvée !')
        });
      }
    });
  
  
  Parking.deleteOne({_id: req.params.parkingID }).then(
        () => {
          res.status(200).json({
           message: 'Parking supprimé !'
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



