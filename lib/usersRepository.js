const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      User = require('../models/user');

class UsersRepository {

    // get a user
    getUser(email, callback) {
        console.log('*** UsersRepository.getUser');
        User.find(
            { 'email': email }, 
            {}, (err, user) => {
            if (err) { 
                console.log(`*** UsersRepository.getUser error : ${err}`); 
                return callback(err); 
            }
            callback(null, user);
        });
    }

    // get all the users
    getUsers(callback) {
        console.log('*** UsersRepository.getUsers');
        User.find({}, (err, users) => {
            if (err) { 
                console.log(`***  UsersRepository.getUser error : ${err}`); 
                return callback(err); 
            }
            callback(null, {
                count: count,
                users: users
            });
        });
    }

}

module.exports = new UsersRepository();
