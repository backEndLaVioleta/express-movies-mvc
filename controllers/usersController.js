import userModel from '../models/userModels.js';
import  HttpError  from 'http-errors';
import bcrypt from 'bcrypt'
// GET
const getAllUsers = (req, res, next) =>{
    const users = userModel.getUsers();
    res.json(users).status(200);
}
// GET
/* const userLogin = (req, res, next) => {
    let userName = req.body.username;
    let userPassword = req.body.password;
    const user = userModel.userLogin(userName, userPassword);
    if(user.length > 0)
    res.json({name: `${userName}`, password: `${userPassword}`})
} */

const registerUser = async (req, res, next) =>{
 console.log('register controller works');
 try {
     
const body = req.body;
// si no tengo datos en name o pass
if(!body.username || !body.password){
    next(HttpError(400,{message:'Error in the incoming data'}))
}else {
//
const saltRounds = 10;

const passwordHardsh = await bcrypt.hash(body.password, saltRounds);

// si todo es correcto DEBEMOS guardar esoso datos!!! Important
// Guardamos estos datos enun obj
const user = {username: body.username, password: passwordHardsh}

const result = userModel.createUser(user);

if(result < 0)
next(HttpError(400, {message:'Failed register'}))

res.status(200).json(result);
}
 } catch (error) {
     next(error);
 }

}

const loginUser = (req, res, next) => {
 console.log('login controller works');
 // rq.body
 const body = req.body;
 // we send username and user password
 let checkUser = userModel.userLogin(body.username, body.password);
 console.log(checkUser);
 let token = "miToken";
 if(!body.username || !body.password){
    next(HttpError(400,{message:'Error in the incoming data'}))
} else {
 (checkUser == true) ? res.json({token: token}).send( `${userName} Welcome to your page`).status(200) :
                       next(HttpError(404, {message: `User ${body.username} not found`}));
 

}
}
export default  {
    getAllUsers,
    registerUser,
    loginUser
}