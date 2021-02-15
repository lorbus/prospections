const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      Customer = require('../models/customer');

class CustomersRepository {

    // get all the customers
    getCustomers(callback) {
        console.log('*** CustomersRepository.getCustomers');
        Customer.countDocuments((err, custsCount) => {
            let count = custsCount;
            console.log(`Customers count: ${count}`);

            Customer.find({}, (err, customers) => {
                if (err) {
                    console.log(`*** CustomersRepository.getCustomers error: ${err}`);
                    return callback(err);
                }
                callback(null, {
                    count: count,
                    customers: customers
                });
            });

        });
    }

    getPagedCustomers(skip, top, startDate, endDate, callback) {
        console.log('*** CustomersRepository.getPagedCustomers');

        const findQuery = (startDate==='null') ? {} : { 'prospectionDate': { $gte: startDate, $lte: endDate } };

        Customer.countDocuments((err, custsCount) => {
            let count = custsCount;

            console.log( `Skip: ${skip} Top: ${top} Customers count: ${count} Start Date: ${startDate} End Date: ${endDate}` );

            Customer.find(findQuery)
                    .sort({lastName: 1})
                    .skip(skip)
                    .limit(top)
                    .exec((err, customers) => {
                        if (err) {
                            console.log(`*** CustomersRepository.getPagedCustomers error: ${err}`);
                            return callback(err);
                        }
                        callback(null, {
                            count: count,
                            customers: customers
                        });
                    });

        });
    }

    // get a customer
    getCustomer(id, callback) {
        console.log('*** CustomersRepository.getCustomer');
        Customer.findById(id, (err, customer) => {
            if (err) {
                console.log(`*** CustomersRepository.getCustomer error: ${err}`);
                return callback(err);
            }
            callback(null, customer);
        });
    }

    // insert a customer
    insertCustomer(body, state, callback) {
        console.log('*** CustomersRepository.insertCustomer');

        let customer = new Customer();

        let newState = {
            'id': state[0].id,
            'abbreviation': state[0].abbreviation,
            'name': state[0].name,
            'zip': state[0].zip,

        }
        // console.log(body);

        customer.prospectionDate = body.prospectionDate;
        customer.firstName = body.firstName;
        customer.lastName = body.lastName;
        customer.email = body.email;
        customer.address = body.address;
        customer.bdmName = body.bdmName;
        customer.leadFrom = body.leadFrom;
        customer.businessType = body.businessType;
        customer.registration = body.registration;
        customer.businessName = body.businessName;
        customer.locationName = body.locationName;
        customer.phone = body.phone;
        customer.pending = body.pending;
        customer.role = body.role;
        customer.phone = body.phone;
        customer.pending = body.pending;
        customer.archivedReason = body.archivedReason;
        customer.archiveDate = body.archiveDate;
        customer.note1 = body.note1;
        customer.note2 = body.note2;
        customer.stateId = newState.id;
        customer.state = newState;

        customer.save((err, customer) => {
            if (err) {
                console.log(`*** CustomersRepository insertCustomer error: ${err}`);
                return callback(err, null);
            }

            callback(null, customer);
        });
    }

    updateCustomer(id, body, state, callback) {
        console.log('*** CustomersRepository.editCustomer');

        let stateObj = {
            'id': state[0].id,
            'abbreviation': state[0].abbreviation,
            'name': state[0].name,
            'zip': state[0].zip,
        }

        Customer.findById(id, (err, customer)  => {
            if (err) {
                console.log(`*** CustomersRepository.editCustomer error: ${err}`);
                return callback(err);
            }

            customer.firstName = body.firstName || customer.firstName;
            customer.lastName = body.lastName || customer.lastName;
            customer.email = body.email || customer.email;
            customer.address = body.address || customer.address;
            customer.prospectionDate = body.prospectionDate || customer.prospectionDate;
            customer.bdmName = body.bdmName || customer.bdmName;
            customer.leadFrom = body.leadFrom || customer.leadFrom;
            customer.businessType = body.businessType || customer.businessType;
            customer.registration = body.registration || customer.registration;
            customer.businessName = body.businessName || customer.businessName;
            customer.locationName = body.locationName || customer.locationName;
            customer.phone = body.phone || customer.phone;
            customer.pending = body.pending || customer.pending;
            customer.role = body.role || customer.role;
            customer.phone = body.phone || customer.phone;
            customer.pending = body.pending || customer.pending;
            customer.archivedReason = body.archivedReason;
            customer.archiveDate = body.archiveDate;
            customer.note1 = body.note1 || customer.note1;
            customer.note2 = body.note2 || customer.note2;
            customer.state = stateObj;
            customer.stateId = stateObj.id;

            customer.save((err, customer) => {
                if (err) {
                    console.log(`*** CustomersRepository.updateCustomer error: ${err}`);
                    return callback(err, null);
                }
                callback(null, customer);
            });

        });
    }

    // delete a customer
    deleteCustomer(id, callback) {
        console.log('*** CustomersRepository.deleteCustomer');
        Customer.remove({ '_id': id }, (err, customer) => {
            if (err) {
                console.log(`*** CustomersRepository.deleteCustomer error: ${err}`);
                return callback(err, null);
            }
            callback(null, customer);
        });
    }

}

module.exports = new CustomersRepository();
