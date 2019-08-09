const express = require('express');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/user-routes')

const app = express();
const port = 3000;


app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));

app.get('/', (req, res) => {
	res.render('index')
})

app.use('/user', userRoutes);

app.listen(port, () => console.log(`Example app listening on port ${port}`));