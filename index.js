const express = require('express');
const bodyParser = require('body-parser');
// const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');
const keys = require('./config/keys');
const Users = require('./models/users');
const { addGameToUser } = require('./controllers/newGame')
const passport = require('passport');
const authentication = require('./controllers/authentication')
require('./passport/passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());

// router(app);

// Server Setup
const port = process.env.PORT || 8080;

const findUser = async () => {
	const user = await Users.find({_id: '65c18ccf19a26401b18e2697'})
	return(user[0]);
}

  
// DB Setup
mongoose
	.connect(keys.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('🚀 DB Connected!');
		app.listen(port, () => {
			console.log('😎 Server listening on:', port);
		});
	})

	.catch((err) => {
		console.log(`❌ DB Connection Error: ${err.message}`);
	});

app.get('/', async (req, res) => {
		const hello = await findUser();
		res.send(hello)
	})

app.post('/newgame', addGameToUser)
app.post('/signup', authentication.signup)
app.post('/auth/signin', requireSignin, authentication.signin)
app.get('/auth/current_user', requireAuth, authentication.currentUser)