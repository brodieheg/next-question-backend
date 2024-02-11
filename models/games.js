const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define our model
const gameSchema = new Schema({
	user: { type: Schema.Types.ObjectId, ref: 'user' },
  dateCreated: String,
  score: Number,
  category: String,
  difficulty: String,
  type: String,
  questions: []
});

const Game = mongoose.model('game', gameSchema);

module.exports = {
	Game,
	GameSchema: gameSchema,
};
