const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const userRoutes = require('./routes/user-routes');
const authRoutes = require('./routes/auth-routes');
const proRoutes = require('./routes/products-routes');
const authMiddle = require('./middlewares/auth-middleware');
const sessionMiddle = require('./middlewares/session-middleware');


const app = express();
const port = 3000;


app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser('abcxyz'));
app.use(express.static('public'));
app.use(sessionMiddle);

app.get('/', (req, res) => {
	res.render('index')
})

app.use('/user', authMiddle.requireAuth, userRoutes);
app.use('/auth', authRoutes);
app.use('/products', proRoutes);

app.listen(port, () => console.log(`Example app listening on port ${port}`));