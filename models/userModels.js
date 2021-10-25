import users from '../data/users.js';


class UserModel {
     // USERS
     getUsers(){
         let text = 'Welcome, you need to Sign Up or Loggin'
         // return users;
         return text;
     }
     
     getOneUser(obj){
         
         return users.find((el) => el.username == obj.username);
     }
    
    // create user
    createUser(obj){
        users.push(obj);
        return users.find((el) => el.username == obj.username);
    }
    
    // GET

    // POST

    //PUT

    //DELETE
}

export default new UserModel();