import users from '../data/users.js';

class UserModel {
     // USERS
     getUsers(){
         let text = 'Welcome, you need to Sign Up or Loggin'
         // return users;
         return text;
     }
    // LOGIN GET method
    userLogin(str1, str2){
        //let isUserIn = false;
//
        //const user = users.filter((el) => el.username == str1 && el.password == str2);
//
        //(user < 0) ? isUserIn : isUserIn = true;
        //console.log(isUserIn);
        //
        //return isUserIn;
        return users.some((el) => el.username == str1 && el.password == str2);
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