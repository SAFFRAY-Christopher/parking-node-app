const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user = require('../models/User');
const User = require('../models/User');

exports.signUp = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
          const user = new User({
            email: req.body.email,
            password: hash,
            role: req.body.role
          });
          user.save()
            .then(() => res.status(201).json({ message: 'Utilisateur créé !'}))
            .catch(error => res.status(400).json({ error }));
        })
        .catch( error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    User.findOne ({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé ! '});
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({  error: 'Mot de passe incorrect ! '});
                    }
                    res.status(200).json({ 
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24H'}
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch( error => res.status(500).json({ error }));
};



exports.getAllUsers = (req, res, next) => {
    User.find()
    .then(users => res.status(200).json(users))
    .catch(error => res.status(400).json( {error} ));

}

exports.getOneUser = (req, res, next) => {
    User.findOne({ _id: req.params.UserID})
    .then(User => {
            if(User != 'null'){
                res.status(200).json(User)
            } else{
                throw new Error('null');        }
            })
    .catch(error => res.status(404).json({ error }));

}

exports.updateUser = (req, res, next) => {
    User.updateOne({ _id: req.params.UserID }, { ...req.body, _id: req.params.UserID })
    .then(() => res.status(200).json({ message: 'User modifié !'}))
    .catch(error => res.status(400).json({ error }));

}


exports.deleteUser = (req, res, next) => {
    User.findOne({ _id: req.params.UserID }).then(
        (User) => { 
          if (!User) {
            return res.status(404).json({
              error: new Error('User non trouvé !')
            });
          }

          if (User._id.valueOf() !== req.auth.userId) {
            return res.status(401).json({
              error: new Error('Requête non autorisée')
            });
          }
        }
      );
      User.deleteOne({_id: req.params.UserID }).then(
        () => {
          res.status(200).json({
           message: 'User supprimé !'
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

exports.getRoleUser = (userId) => {
  
  return new Promise( (resolve, reject) => {
    User.findOne({ _id: userId})
    .then(User => {
          if(User){
             resolve(User.role)
          } else{
              throw new Error('null');        
            }
          })
    .catch(error => {
      reject(error)
    });
  })
}
  
