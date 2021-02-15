// Module dependencies
const   mongoose = require('mongoose'),
        Customer = require('../models/customer'),
        State = require('../models/state'),
        User = require('../models/user'),
        dbConfig = require('./configLoader').databaseConfig,
        connectionString = `mongodb://${dbConfig.host}/${dbConfig.database}`,
        connection = null;

class DBSeeder {
    
    init() {
        mongoose.connection.db.listCollections({name: 'customers'})
                .next((err, collinfo) => {
                    if (!collinfo) {
                        console.log('Starting dbSeeder...');
                        this.seed();
                    }
                });
    }
    
    seed() {

        console.log('Seeding data....');

        //Customers
        var customerNames =
        [
            "Marcus,HighTower,Male,acmecorp.com",
            "Jesse,Smith,Female,gmail.com",
            "Albert,Einstein,Male,outlook.com",
            "Dan,Wahlin,Male,yahoo.com",
            "Ward,Bell,Male,gmail.com",
            "Brad,Green,Male,gmail.com",
            "Igor,Minar,Male,gmail.com",
            "Miško,Hevery,Male,gmail.com",
            "Michelle,Avery,Female,acmecorp.com",
            "Heedy,Wahlin,Female,hotmail.com",
            "Thomas,Martin,Male,outlook.com",
            "Jean,Martin,Female,outlook.com",
            "Robin,Cleark,Female,acmecorp.com",
            "Juan,Paulo,Male,yahoo.com",
            "Gene,Thomas,Male,gmail.com",
            "Pinal,Dave,Male,gmail.com",
            "Fred,Roberts,Male,outlook.com",
            "Tina,Roberts,Female,outlook.com",
            "Cindy,Jamison,Female,gmail.com",
            "Robyn,Flores,Female,yahoo.com",
            "Jeff,Wahlin,Male,gmail.com",
            "Danny,Wahlin,Male,gmail.com",
            "Elaine,Jones,Female,yahoo.com",
            "John,Papa,Male,gmail.com"
        ];
        var addresses =
        [
            "1234 Anywhere St.",
            "435 Main St.",
            "1 Atomic St.",
            "85 Cedar Dr.",
            "12 Ocean View St.",
            "1600 Amphitheatre Parkway",
            "1604 Amphitheatre Parkway",
            "1607 Amphitheatre Parkway",
            "346 Cedar Ave.",
            "4576 Main St.",
            "964 Point St.",
            "98756 Center St.",
            "35632 Richmond Circle Apt B",
            "2352 Angular Way",
            "23566 Directive Pl.",
            "235235 Yaz Blvd.",
            "7656 Crescent St.",
            "76543 Moon Ave.",
            "84533 Hardrock St.",
            "5687534 Jefferson Way",
            "346346 Blue Pl.",
            "23423 Adams St.",
            "633 Main St.",
            "899 Mickey Way"
        ];

        var citiesStates =
        [
            "Phoenix,AZ,Arizona",
            "Encinitas,CA,California",
            "Seattle,WA,Washington",
            "Chandler,AZ,Arizona",
            "Dallas,TX,Texas",
            "Orlando,FL,Florida",
            "Carey,NC,North Carolina",
            "Anaheim,CA,California",
            "Dallas,TX,Texas",
            "New York,NY,New York",
            "White Plains,NY,New York",
            "Las Vegas,NV,Nevada",
            "Los Angeles,CA,California",
            "Portland,OR,Oregon",
            "Seattle,WA,Washington",
            "Houston,TX,Texas",
            "Chicago,IL,Illinois",
            "Atlanta,GA,Georgia",
            "Chandler,AZ,Arizona",
            "Buffalo,NY,New York",
            "Albuquerque,AZ,Arizona",
            "Boise,ID,Idaho",
            "Salt Lake City,UT,Utah",
            "Orlando,FL,Florida"
        ];

        var citiesIds = [5, 9, 44, 5, 36, 17, 16, 9, 36, 14, 14, 6, 9, 24, 44, 36, 25, 19, 5, 14, 5, 23, 38, 17];

        var zip = 1201;


        Customer.remove({});

        var l = customerNames.length,
            i,
            j;

        for (i = 0; i < l; i++) {
            var nameGenderHost = customerNames[i].split(',');
            var cityState = citiesStates[i].split(',');
            var state = { 'id': citiesIds[i], 'abbreviation': cityState[1], 'name': cityState[2] };
            var customer = new Customer({
                'firstName': nameGenderHost[0],
                'lastName': nameGenderHost[1],
                'email': nameGenderHost[0] + '.' + nameGenderHost[1] + '@' + nameGenderHost[3],
                'address': addresses[i],
                'state': state,
                'stateId': citiesIds[i],
                'zip': zip + i
            });

            customer.save((err, cust) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('inserted customer: ' + cust.firstName + ' ' + cust.lastName);
                }
            });
        }

        //States
        var states = [
        { "name": "Alabama", "abbreviation": "AL" },
        { "name": "Montana", "abbreviation": "MT" },
        { "name": "Alaska", "abbreviation": "AK" },
        { "name": "Nebraska", "abbreviation": "NE" },
        { "name": "Arizona", "abbreviation": "AZ" },
        { "name": "Nevada", "abbreviation": "NV" },
        { "name": "Arkansas", "abbreviation": "AR" },
        { "name": "New Hampshire", "abbreviation": "NH" },
        { "name": "California", "abbreviation": "CA" },
        { "name": "New Jersey", "abbreviation": "NJ" },
        { "name": "Colorado", "abbreviation": "CO" },
        { "name": "New Mexico", "abbreviation": "NM" },
        { "name": "Connecticut", "abbreviation": "CT" },
        { "name": "New York", "abbreviation": "NY" },
        { "name": "Delaware", "abbreviation": "DE" },
        { "name": "North Carolina", "abbreviation": "NC" },
        { "name": "Florida", "abbreviation": "FL" },
        { "name": "North Dakota", "abbreviation": "ND" },
        { "name": "Georgia", "abbreviation": "GA" },
        { "name": "Ohio", "abbreviation": "OH" },
        { "name": "Hawaii", "abbreviation": "HI" },
        { "name": "Oklahoma", "abbreviation": "OK" },
        { "name": "Idaho", "abbreviation": "ID" },
        { "name": "Oregon", "abbreviation": "OR" },
        { "name": "Illinois", "abbreviation": "IL" },
        { "name": "Pennsylvania", "abbreviation": "PA" },
        { "name": "Indiana", "abbreviation": "IN" },
        { "name": "Rhode Island", "abbreviation": "RI" },
        { "name": "Iowa", "abbreviation": "IA" },
        { "name": "South Carolina", "abbreviation": "SC" },
        { "name": "Kansas", "abbreviation": "KS" },
        { "name": "South Dakota", "abbreviation": "SD" },
        { "name": "Kentucky", "abbreviation": "KY" },
        { "name": "Tennessee", "abbreviation": "TN" },
        { "name": "Louisiana", "abbreviation": "LA" },
        { "name": "Texas", "abbreviation": "TX" },
        { "name": "Maine", "abbreviation": "ME" },
        { "name": "Utah", "abbreviation": "UT" },
        { "name": "Maryland", "abbreviation": "MD" },
        { "name": "Vermont", "abbreviation": "VT" },
        { "name": "Massachusetts", "abbreviation": "MA" },
        { "name": "Virginia", "abbreviation": "VA" },
        { "name": "Michigan", "abbreviation": "MI" },
        { "name": "Washington", "abbreviation": "WA" },
        { "name": "Minnesota", "abbreviation": "MN" },
        { "name": "West Virginia", "abbreviation": "WV" },
        { "name": "Mississippi", "abbreviation": "MS" },
        { "name": "Wisconsin", "abbreviation": "WI" },
        { "name": "Missouri", "abbreviation": "MO" },
        { "name": "Wyoming", "abbreviation": "WY" }
        ];

        var l = states.length,
            i;

        State.remove({});

        for (i = 0; i < l; i++) {
            var state = new State ({ 'id': i + 1, 'name': states[i].name, 'abbreviation': states[i].abbreviation });
            state.save();
        }
    }
}

module.exports = new DBSeeder();




