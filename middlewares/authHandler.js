import  HttpError  from "http-errors";


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

export default authUser;