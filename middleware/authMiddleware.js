const jwtHelper = require('../utils/jwtHelper'); 

module.exports = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    console.log(token); 
    if (!token) return res.status(401).json({ error: 'Token is required.' }); 
    try {
        const decoded = jwtHelper.verifyToken(token);
        req.user = decoded;  
        next();  
    } catch (err) {
        res.status(401).json({ error: 'Invalid token.' }); 
    }
}