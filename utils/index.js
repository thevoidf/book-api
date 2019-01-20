const jwt = require('jsonwebtoken');

module.exports.signToken = (user) => {
	return new Promise((resolve, reject) => {
		jwt.sign(user, 'secret', (error, token) => {
			if (error) return reject(error);
			resolve(token);
		});
	});
}
