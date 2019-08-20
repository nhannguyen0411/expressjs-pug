const db = require('../db');

module.exports.requireAuth = (req, res, next) => {
	if(!req.cookies.userId){
		res.redirect('/auth/login');
		return;
	}

	let id = parseInt(req.cookies.userId);
	let user = db.get('users').find({ id: id }).value();
	
	if(!user) {
		res.redirect('/auth/login');
		return;
	}

	next();
}

