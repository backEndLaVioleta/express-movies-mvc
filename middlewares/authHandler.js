import  HttpError  from "http-errors";
import bcrypt from 'bcrypt';


const authUser = (req, res, next) =>{

    // conseguimos el token completo
    const authorization = req.get('authorization');
    // si lo tenemos debemos dejar detrás los siete primeros espacios del string
    if(!authorization)
    next(HttpError(401,{message:"No token"}))
    // if(authorization)
    const token = authorization.substring(7);

    // desencriptar token para obtener username
    // comparar el username token con username BBDD
    // obtenemos fecha caducidad del token

    (token) ? next(): next(HttpError(401, {message:"Invalid token"}));
}

/* const decrypthandler = async (req, res, next) =>{

    try {
      const  passwordCorrect = await bcrypt.compare(req.body.password, user.password);
    } catch (error) {
        next(error)
    }
} */
export default {
    authUser
};