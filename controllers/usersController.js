import userModels from "../models/userModels.js";
import HttpError from "http-errors";
import bcrypt from "bcrypt";
import authHandler from "../middlewares/authHandler.js";
// GET
const getAllUsers = async (req, res, next) => {

  try {
    const users = await userModel.getUsers();
  res.json(users).status(200);
  } catch (error) {
    next(HttpError(400, {message:" User's error"}));
  }
  
};

const registerUser = async (req, res, next) => {

  try {
    const body = req.body;

    // si no tengo datos en name o pass
    if (!body.username || !body.password) {
      next(HttpError(400, { message: "Error in the incoming data" }));
    } else {
      //
      // const saltRounds = 10;
      // si no HAY un await no es necesario que la función sea async!!!!!!!!
      // const passwordHardsh = await bcrypt.hash(body.password, saltRounds);

      // si todo es correcto DEBEMOS guardar esoso datos!!! Important
      // Guardamos estos datos enun obj
      const user = { username: body.username, password: body.password, role: body.role };
     
      const result = await userModels.createUser(user);
      console.log(result);

     // if (result == undefined) next(HttpError(400, { message: "Failed register" }));

      res.status(200).json(result);
    }

  } catch (error) {

    next(HttpError(400, {message: 'Something wrong at creating user'}));

  }

};

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
      const user = userModels.getOneUser({ username: body.username });

      console.log(user);

      // lets work with the data
      if (user === undefined) {

        next(HttpError(400, { message: "Username or Password incorrect" }));

      } else {
        const passwordCorrect = await bcrypt.compare(
          body.password,
          user.password
        );

        if (!passwordCorrect) {
          next(HttpError(401, { message: "Username or Passwrod incorrect" }));
        } else {
          // let token = "miToken";
          // aqui generamos el token
          const token = await authHandler.generateToken(body.username);
          res
            .json({ token: token })
            .send(`${body.username} Welcome to your page`)
            .status(200);
        }
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
