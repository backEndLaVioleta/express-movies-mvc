import userModel from '../models/userModels.js';

const getAllUsers = (req, res, next) =>{
    const users = userModel.getUsers();
    res.json(users).status(200);
}

const addPassword = (req, res, next) => {

}

export default  {
    getAllUsers
}