const jwt = require("jsonwebtoken")

const authenticate = (req,res,next)=>{
    const token = req.headers.authorization;
    // verify a token symmetric
    if (token){
        jwt.verify(token, 'shhh', function(err, decoded) {
            if (decoded) {
                req.body.userID = decoded.userID
                req.body.author = decoded.name
                // console.log(decoded)
                next()
            }
            else {
                res.send("Wrong Credential")
            }
        });
    }
    else {
        res.send("Login First")
    }
}


module.exports = {
    authenticate
}