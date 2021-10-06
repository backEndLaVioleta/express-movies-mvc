import users from '../data/users.js';

class UserModel {
     // USERS
     getUsers(){
         return users;
     }
    // LOGIN
    loginUser(str1, str2){
        const user = users.filter((el) => el.name == str1 && el.password == str2);
        return user;
    }
    
    // GET

    // POST

    //PUT

    //DELETE
}

export default new UserModel();