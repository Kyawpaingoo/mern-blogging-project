import jwt from 'jsonwebtoken'

const CheckAuth = (req, res, next)=>{
    const {access_token} = req.cookies;
    const jwt_secrect = process.env.JWT_TOKEN;
    if(!jwt_secrect){
        return res.json('not_auth');
    }

    jwt.verify(access_token, jwt_secrect, (error,data)=>{
        if(error){
            return res.json('not_auth');
        }
        req.AuthUser = data;
        next();
    })
}

export default CheckAuth;