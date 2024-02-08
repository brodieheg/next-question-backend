const Game = require('../models/games');
const Users = require('../models/users');
exports.addGameToUser = async (req, res, next) => {
	try{
    const game = new Game.Game(req.body)
		await game.save();
		res.send({
			game
		})
	}
	catch(err) {
		next(err)
	}
};

exports.getWatchList = async (req, res, next) => {
	try {
		const user = await User.findOne({ _id: req.user._id });

		res.send({
			movies: user.watchList,
			watchListCount: user.watchList.length,
		});
	} catch (err) {
		next(err);
	}
};
