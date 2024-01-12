import jwt from 'jsonwebtoken';
const SECRET_KEY = "ETE-TECHNOLOGY"

const generateToken = (user:any) => {
    return jwt.sign({username: user.username, password: user.password }, SECRET_KEY,{
        expiresIn: '1h'
    });
};

const verifyToken = (token) =>{
    return jwt.verify(token,SECRET_KEY);
}

module.exports = {generateToken, verifyToken}