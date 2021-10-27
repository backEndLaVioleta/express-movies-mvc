import  HttpError  from "http-errors";
import mysql from 'mysql2';

export const clientErrorHandler = (err, req, res, next) =>{
    if(err instanceof HttpError.HttpError)
    res.status(err.statusCode).json({error: err.message});
};


export const clientErrorHandlerSql = (err, req, res, next) => {
    if(err instanceof HttpError.HttpError)
    res.status(err.statusCode).json({error: err.message});
    if(err.sqlMessage ==  err.message)
    res.status(400).json({ERROR: err.message});
    if(err.name === "JsonWebTokenError" )
    res.status(400).json({ERROR: err.message});

    next(err);
};

export const genericErrorHandler = (err, req, res, next) => {
if(res.headersSent){
    return next(err);
}
res.status(err.statusCode).json({
    error : 'An error has occurred',
    'name': err.name
})
}; 

   

