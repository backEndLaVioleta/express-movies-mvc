import userModel from "../models/userModels.js";
import HttpError from "http-errors";
import bcrypt from "bcrypt";
// GET
const getAllUsers = (req, res, next) => {
  const users = userModel.getUsers();
  res.json(users).status(200);
};
// GET
/* const userLogin = (req, res, next) => {
    let userName = req.body.username;
    let userPassword = req.body.password;
    const user = userModel.userLogin(userName, userPassword);
    if(user.length > 0)
    res.json({name: `${userName}`, password: `${userPassword}`})
} */

const registerUser = async (req, res, next) => {
  console.log("register controller works");
  try {
    const body = req.body;
    // si no tengo datos en name o pass
    if (!body.username || !body.password) {
      next(HttpError(400, { message: "Error in the incoming data" }));
    } else {
      //
      // const saltRounds = 10;

      // const passwordHardsh = await bcrypt.hash(body.password, saltRounds);

      // si todo es correcto DEBEMOS guardar esoso datos!!! Important
      // Guardamos estos datos enun obj
      const user = { username: body.username, password: body.password };

      const result = userModel.createUser(user);

      if (result < 0) next(HttpError(400, { message: "Failed register" }));

      res.status(200).json(result);
    }
  } catch (error) {
    next(error);
  }
};

/* const loginUser = async (req, res, next) => {
 console.log('login controller works');
 try {
     // rq.body
 const body = req.body;
 // get me an user
 const user = userModel.getOneUser(body.username);
 console.log(user);
 const saltRounds = 10;
 const passwordCrypted = await bcrypt.hash(body.password, saltRounds);
 // we send username and user password
 let checkUser = userModel.userLogin(body.username, passwordCrypted);
 console.log(checkUser);
 let token = "miToken";
 if(!body.username || !passwordCrypted){
    next(HttpError(400,{message:'Error in the incoming data'}))
} else {
 (checkUser == true) ? res.json({token: token}).send( `${userName} Welcome to your page`).status(200) :
                       next(HttpError(404, {message: `User ${body.username} not found`}));
 

}
     
 } catch (error) {
     next(error);
 }
 
} */

// Raul Solution
const loginUser = async (req, res, next) => {
  try {
    // instanciamos body
    const body = req.body;
    // si falta algun dato, error
    if (!body.username || !body.password) {
      next(HttpError(400, { message: "Error in the incoming data" }));
    } else {
        // I need the user object
      const user = userModel.getOneUser(body.username);
      console.log(user);
      // lets work with the data
      if (user === undefined) {
          next(HttpError(400, {message: 'Username or Password incorrect'}));
      } else {
         await bcrypt.compare(body.password, user.password); 
         let token = "miToken";
         res.json({token: token}).send( `${body.username} Welcome to your page`).status(200)
      }
    }
  } catch (error) {
    next(error);
  }
};
export default {
  getAllUsers,
  registerUser,
  loginUser,
};
