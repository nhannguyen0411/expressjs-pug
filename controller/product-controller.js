const db = require('../db');

module.exports.index = (req, res) => {
	let page = parseInt(req.query.page) || 1; // n
	let perPage = 8; // x

	let start = (page - 1) * perPage;
	let end = page * perPage;
	
	res.render('products/index', {
		products: db.get('products').value().slice(start, end)
	})
}

module.exports.search = (req, res) => {
	let q = req.query.q;
	let findItem = db.get('products').value().filter(item => {
		return item.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
	})

	res.render('products/index', {
		products: findItem
	})
}
