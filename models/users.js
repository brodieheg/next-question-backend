const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');
const Game = require('../models/games');

// Define our model
const UserSchema = new Schema({
	email: { type: String, unique: true, lowercase: true },
  games: [{ type: Schema.Types.ObjectId, ref: 'game' }],
	hash: String,
	salt: String,
  allTimeScore: Number,
  totalQuestionsAttempted: Number
});

UserSchema.methods.setPassword = function (password) {
	this.salt = crypto.randomBytes(16).toString('hex');
	this.hash = crypto
		.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
		.toString('hex');
};

UserSchema.methods.validPassword = function (password) {
	var hash = crypto
		.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
		.toString('hex');

	return this.hash === hash;
};

const User = mongoose.model('user', UserSchema);

module.exports = User;
