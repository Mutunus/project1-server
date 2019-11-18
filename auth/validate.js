const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try {
        // get token from header
        const token = req.headers.authorization;
        const decodedUser = jwt.verify(token, 'JWT_KEY')

        console.log('auth requested for', decodedUser)

        req.user = decodedUser;
    
        next();
    }
    catch {
        res.status(401).json('authentication failed')
    }
    
}