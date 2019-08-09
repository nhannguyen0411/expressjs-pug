const db = require('../db');

module.exports.index = (req, res) => {
	res.render('users/index', {
		users: db.get('users').value()
	})
}

module.exports.search = (req, res) => {
	let q = req.query.q;
	let matchedUser = db.get('users').value().filter(user => {
		return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
	})

	res.render('users/index', {
		users: matchedUser
	})
}
module.exports.create = (req, res) => {
	res.render('users/create')
}
module.exports.postCreate = (req, res) => {
	let errors = [];

	if(!req.body.name){
		errors.push('Name is not valid');
	}

	if(!req.body.phone){
		errors.push('Phone is not valid');
	}

	if(errors.length){
		res.render('users/create', {
			errors: errors,
			values: req.body
		});
		return;
	}
	db.get('users').push(req.body).write();

	res.render('users/index', {
		users: db.get('users').value()
	})
}