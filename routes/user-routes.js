const express = require('express');
const router = express.Router();
const controller = require('../controller/user-controller')

router.get('/', controller.index);


router.get('/cookie', (req, res) => {
	res.cookie('user-id', 123456);
	res.send('Hello');
})

router.get('/search', controller.search);

router.get('/create', controller.create);

router.get('/edit/:id', controller.edit);

router.get('/edit/:id/delete', controller.del);

router.get('/edit/:id/change', controller.change);

router.post('/edit/:id/change', controller.postChange);

router.post('/create', controller.postCreate);



module.exports = router;