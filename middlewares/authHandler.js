import  HttpError  from "http-errors";
import bcrypt from 'bcrypt';
import  jwt  from "jsonwebtoken";

const SECRET = 'mysecreto';
    // desencriptar token para obtener username
    // comparar el username token con username BBDD
    // obtenemos fecha caducidad del token
    /**
     * Debemos recordar que debemos encriptar el password entrante
     * y compararlo con el password YA encriptado que tenemos en la 
     * base de datos
     */

const authUser = (req, res, next) =>{

    // conseguimos el token completo
    const authorization = req.get('authorization');
    // si lo tenemos debemos dejar detrás los siete primeros espacios del string
    if(!authorization)
    next(HttpError(401,{message:"No token"}))
    // if(authorization)
    const token = authorization.substring(7);

    (token) ? next(): next(HttpError(401, {message:"Invalid token"}));
}

const encryptPassword = async (req, res, next) => {
    try {
        const saltRounds = 10;
        const passwordHardsh = await bcrypt.hash(req.body.password, saltRounds);
        req.body.password = passwordHardsh;
        next();
        
    } catch (error) {
        next(error);
    }
}

const getTokenFrom = (request) => {
    const authorization = request.get('authorization');

    if(authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7);
    } else {
        return null;
    }
}
// nos genera el payload del jwt
const generateToken = (username) => jwt.sign({username: username}, SECRET);

 // checks token
const verifyToken = (token) => jwt.verify(token, SECRET);

export default {
    authUser,
    encryptPassword,
    generateToken,
    verifyToken,
    getTokenFrom
};