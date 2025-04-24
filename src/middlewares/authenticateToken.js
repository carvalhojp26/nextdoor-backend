const jwt = require("jsonwebtoken");

function authenticateToken (req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.send(401);
    }

    jwt.verify(token, process.env.SECRET_KEY, (error, user) => {
        if (error) {
            return res.send(403);
        }
        req.user = user;
        next()
    })
}

module.exports = authenticateToken;