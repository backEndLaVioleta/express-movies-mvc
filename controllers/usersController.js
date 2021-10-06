import userModel from '../models/userModels.js';
// GET
const getAllUsers = (req, res, next) =>{
    const users = userModel.getUsers();
    res.json(users).status(200);
}
// GET
const userLogin = (req, res, next) => {
    let userName = req.body.name;
    let userPassword = req.body.password;
    const user = userModel.userLogin(userName, userPassword);
    if(user.length > 0)
    res.json({name: `${userName}`, password: `${userPassword}`})
}

export default  {
    getAllUsers
}