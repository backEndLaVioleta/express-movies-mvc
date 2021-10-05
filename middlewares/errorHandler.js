import  HttpError  from "http-errors";

const clientErrorHandler = (err, req, res, next) =>{
    if(err instanceof HttpError.HttpError)
    res.status(err.statusCode).json({error: err.message});
}

export default clientErrorHandler;