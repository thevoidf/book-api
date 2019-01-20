const jwt = require('jsonwebtoken');

module.exports = {
	signToken: user => {
		return new Promise((resolve, reject) => {
			jwt.sign(user, process.env.JWT_SECRET, (error, token) => {
				if (error) return reject(error);
				resolve(token);
			});
		});
	},
	verifyToken: token => {
		return new Promise((resolve, reject) => {
			jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
				if (error) return reject(error);
				resolve(decoded);
			});
		});
	},
	hasToken: (req, res, next) => {
		const tokenHeader = req.get('Authorization');
		if (typeof tokenHeader !== 'string')
			return next(new Error('Token not found'))

		const token = tokenHeader.split(' ')[1];
		if (!token)
			return next(new Error('Can\'t parse token'));

		module.exports.verifyToken(token, process.env.JWT_SECRET)
			.then(decoded => next())
			.catch(error => next(error));
	}
}
