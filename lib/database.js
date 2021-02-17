// Module dependencies
const mongoose = require('mongoose'),
      dbConfig = require('./configLoader').databaseConfig,
      connectionLocal = 'mongodb://mongodb://localhost:27017/prospectionmanager';
      // connectionLocal = 'mongodb://' + dbConfig.host + '/' + dbConfig.database;
      connectionCloud = 'mongodb+srv://ufcmongodb:UFC2005ufc!.@cluster0.xtwx0.mongodb.net/prospectionmanager?retryWrites=true&w=majority';
      // connectionCloud = 'mongodb+srv://' + dbConfig.host + '/' + dbConfig.database;

let   connection = null;

// const db = process.env.MONGODB_URL;

class Database {

    open(callback) {
        var options = {
            promiseLibrary: global.Promise,
            useNewUrlParser: true,
            useUnifiedTopology: true
        };
        mongoose.connect(connectionCloud || connectionLocal, options, (err) => {
            if (err) {
                console.log('mongoose.connect() failed: ' + err);
            }
        });
        connection = mongoose.connection;

        mongoose.connection.on('error', (err) => {
            console.log('Error connecting to MongoDB: ' + err);
            callback(err, false);
        });

        mongoose.connection.once('open', () => {
            console.log('############### We have connected to mongodb ###############');
            callback(null, true);
        });

    }

    // disconnect from database
    close() {
        connection.close(() => {
            console.log('Mongoose default connection disconnected through app termination');
            process.exit(0);
        });
    }

}

module.exports = new Database();
