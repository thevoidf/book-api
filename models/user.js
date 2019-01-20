const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		require: true
	},
	email: {
		type: String,
		require: true
	},
	password: {
		type: String,
		require: true
	},
	isAdmin: {
		type: Boolean,
		default: false
	}
});

userSchema.pre('save', function(next) {
	const user = this;
	const saltRounds = 10;

	bcrypt
		.hash(user.password, saltRounds)
		.then(hash => {
			user.password = hash;
			next();
		}).catch(error => {
			next(error);
		})
});

userSchema.methods.comparePassword = function(password, cb) {
	bcrypt
		.compare(password, this.password)
		.then(function(result) {
			cb(null, result);
		}).catch(error => cb(error));
}

module.exports = mongoose.model('User', userSchema);
