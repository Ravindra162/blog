const jwt = require('jsonwebtoken')
const authMiddleware = async (req,res,next) => {
    const token = req.headers['authorization']
    const verified = jwt.verify(token,"secret")
    if(!verified){
        return res.status(500).json({
            "message":"Authorisation failed"
        })
    }
    req.user = verified.user_id
    console.log(req.user)
    next();
}
module.exports = {authMiddleware}