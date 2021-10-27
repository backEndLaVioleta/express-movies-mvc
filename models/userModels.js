import users from '../data/users.js';
import connection from '../mysql/dbManager.js';

/* class UserModel {
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
} */
class UserModel {
   async getUsers(){
    try {
       
        const result = await connection.query('SELECT * from users');
        return result;

    } catch (error) {
        
        throw error;
    }
    };

    async getOneUser(id){

        try {
            const sql = 'SELECT * from users whrere id = ?';

            const result = await connection.query(
                [sql, id]
            );
            return result;

        } catch (error) {
            
            throw error;
        }
    }
}

export default new UserModel();