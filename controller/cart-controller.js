const db = require('../db');

module.exports.addToCart = (req, res, next) => {
	let productId = req.params.productId;
	let sessionId = req.signedCookies.sessionId;
	let data = db.get('sessions').find({ id: sessionId }).value();
	let sum = 0;

	if(!sessionId){
		res.redirect('/products');
		return;
	}

	let count = db
	.get('sessions')
	.find({ id: sessionId })
	.get('cart.' + productId, 0)
	.value()

	db.get('sessions')
	.find({ id: sessionId })
	.set('cart.' + productId, count + 1)
	.write();

	for(let item in data.cart) {
		sum += data.cart[item];
	}

	db.get('sessions')
	.find({ id: sessionId })
	.set('sum', sum)
	.write();

	// res.render('layouts/common', {
	// 	items: sum
	// })

	res.redirect('/products');
}