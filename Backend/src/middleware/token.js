import jwt from 'jsonwebtoken'
import config from '../config/'

const verifyToken = async (req, res, next) => {
    if (req.url === "/login" || req.url === "/register"){
        next()
        return
    }
    let bearerHeader = req.headers.authorization
    if (typeof bearerHeader !== 'undefined'){
        try{
            let token = bearerHeader.split(" ")[1]
            jwt.verify(token, config.JWT_SECRET_KEY)
            req.token = token
        }catch(error){
            req.token = null
        }
    }
    else{
        req.token = null
    }
    if (!req.token){
        let response = {
            path: req.url,
            status: 401,
            message: "Unauthorized. Token invalid or not provided at all.",
            data: null
        }
        res.end(JSON.stringify(response))
        return
    }
    next()
}

export default verifyToken