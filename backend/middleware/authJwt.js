const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
	const token = req.headers['authorization'];

	if (!token) return res.sendStatus(401);

	jwt.verify(token, '1976', (err, user) => {
		if (err) return res.sendStatus(403);
		req.user = user;
		next();
	});
};

module.exports = authenticateToken;
