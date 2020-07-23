const express = require('express'),
	router = express.Router(),
	bcrypt = require('bcryptjs'),
	jwt = require('jsonwebtoken'),
	config = require('config'),
	auth = require('../../middleware/auth'),
	User = require('../../models/user.model');

router.post('/', (req, res) => {
	const { email, password } = req.body;

	// simple validation
	if (!email || !password) return res.status(400).json({ msg: 'Please enter all the fields' });

	// check for existing user
	User.findOne({ email }).then((user) => {
		if (!user) return res.status(400).json({ msg: 'User does not exist' });

		bcrypt.compare(password, user.password).then((ismatch) => {
			if (!ismatch) return res.status(400).json({ msg: 'Invalid Credentials' });

			jwt.sign({ id: user.id }, config.get('jwtSecret'), { expiresIn: 3600 }, (err, token) => {
				if (err) throw err;

				res.json({
					token,
					user: {
						id: user.id,
						name: user.name,
						email: user.email
					}
				});
			});
		});
	});
});

router.get('/user', auth, (req, res) => {
	User.findById(req.user.id).select('-password').then((user) => res.json(user));
});

module.exports = router;
