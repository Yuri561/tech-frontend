const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
	let token;

	if (req.cookies && req.cookies.token) {
		token = req.cookies.token;
	}

	if (!token) {
		return res.status(401).json({ message: 'Not authorized, no token' });
	}

	try {
		const decoded = jwt.verify(token, '1976');
		req.user = decoded;
		next();
	} catch (error) {
		res.status(401).json({ message: 'Not authorized, token failed' });
	}
};

module.exports = protect;
