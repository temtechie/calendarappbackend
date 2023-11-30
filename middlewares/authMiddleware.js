
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authHeader.substring(7);

    jwt.verify(token, 'your-secret-key', (err, user) => {
        if (err) {
            console.log("err", err);
            return res.status(403).json({ error: 'Forbidden' });
        }
        req.user = user;
        next();
    });
};

module.exports = { authenticateToken };
