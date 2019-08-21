module.exports = (req, res, next) => {
	if(!req.signedCookies.sessionId){
		res.cookie('sessionId', (Math.random *10), {
			signed: true
		});
	}

	next();
}