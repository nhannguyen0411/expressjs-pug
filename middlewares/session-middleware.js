const db = require('../db');
const shortid = require('shortid');

module.exports = (req, res, next) => {
	let data = req.signedCookies.sessionId
	if(!data){
		let sessionId = shortid.generate();

		res.cookie('sessionId', sessionId, {
			signed: true
		});

		db.get('sessions').push({
			id: sessionId
		}).write();
	}

	session = db.get('sessions').find({ id: data }).value();

	res.locals.session = session;

	next();
}