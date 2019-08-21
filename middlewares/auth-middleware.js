const db = require('../db');

module.exports.requireAuth = (req, res, next) => {
	console.log(req.cookies, req.signedCookies)
	if(!req.signedCookies.userId){
		res.redirect('/auth/login');
		return;
	}

	let id = parseInt(req.signedCookies.userId);
	let user = db.get('users').find({ id: id }).value();
	
	if(!user) {
		res.redirect('/auth/login');
		return;
	}

	res.locals.user = user;

	next();
}

