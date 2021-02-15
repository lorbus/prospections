const UsersRepo = require('../../../lib/usersRepository'),
      util = require('util');

class UsersController {

    constructor(router) {
		    router.get('/:email', this.getUser.bind(this));
        router.post('/', this.insertUser.bind(this));
        router.put('/', this.updateUser.bind(this));
        router.delete('/:email', this.deleteUser.bind(this));
    }

    getUser(req, res) {
        console.log('*** getUser');
        const email = req.params.email;

        UsersRepo.getUser(email, (err, user) => {
            if (err) {
                console.log('*** UsersRepo.getUser error: ' + util.inspect(err));
                res.json(null);
            } else {
                console.log('*** UsersRepo.getUser ok');
                res.json(user[0]);
            }
        });
    }

    insertUser(req, res) {
        console.log('*** insertUser');
        console.log('*** req.body');
        console.log(req.body);

        UsersRepo.insertUser(req.body, (err, User) => {
            if (err) {
                console.log('*** UsersRepo.insertUser error: ' + util.inspect(err));
                res.json({status: false, error: 'Insert failed', User: null});
            } else {
                console.log('*** insertUser ok');
                res.json({ status: true, error: null, User: User });
            }
        });

    }

    updateUser(req, res) {
        console.log('*** updateUser');
        console.log('*** req.body');
        console.log(req.body);

        UsersRepo.updateUser(req.params.email, req.body, (err, User) => {
            if (err) {
                console.log('*** updateUser error: ' + util.inspect(err));
                res.json({ status: false, error: 'Update failed', User: null });
            } else {
                console.log('*** updateUser ok');
                res.json({ status: true, error: null, User: User });
            }
        });

    }

    deleteUser(req, res) {
        console.log('*** deleteUser');

        UsersRepo.deleteUser(req.params.email, (err) => {
            if (err) {
                console.log('*** deleteUser error: ' + util.inspect(err));
                res.json({ status: false });
            } else {
                console.log('*** deleteUser ok');
                res.json({ status: true });
            }
        });
	}


}

module.exports = UsersController;
