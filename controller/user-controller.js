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

module.exports.edit = (req, res) => {
	let id = parseInt(req.params.id);

	let user = db.get('users').find({ id: id }).value();

	res.render('users/edit', {
		users: user
	})
}

module.exports.del = (req, res) => {
	let id = parseInt(req.params.id);
	db.get('users').remove({ id: id }).write();
	res.render('users/index', {
		users: db.get('users').value()
	})
	res.redirect('/user');
}

module.exports.change = (req, res) => {
	res.render('users/edit-change');
}

module.exports.postChange = (req, res) => {
	let id = parseInt(req.params.id);
	let name = req.body.name;
	let phone = req.body.phone;
	req.body.avatar = req.file.path.split('\\').slice(1).join('\\');
	db.get('users').find({ id: id }).assign({"name": name, "phone": phone, "avatar": req.body.avatar}).write();

	// res.render('users/index', {
	// 	users: db.get('users').value()
	// })
	res.redirect('/user');
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

	req.body.avatar = req.file.path.split('\\').slice(1).join('\\');

	db.get('users').push(req.body).write();

	// res.render('users/index', {
	// 	users: db.get('users').value()
	// })
	res.redirect('/user');
}