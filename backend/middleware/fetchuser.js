const jwt = require('jsonwebtoken');
const JWT_SECRET = "helloworld$12"

const fetchuser = (req, res, next) => {

    // Get the user details from jwt token and add id to req object
    const token = req.header('auth-token');
    if(!token){

        res.status(401).send({error: "access denied"})
    }

    try {

        const data =  jwt.verify(token, JWT_SECRET);
        req.user = data.user;
    
    } catch (error) {
    
        res.status(401).send({error: "access denied"})
        
    }

    

    next()

}


module.exports = fetchuser;