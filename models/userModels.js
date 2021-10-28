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
       
        const result = await connection.query('SELECT * from user');
        return result;

    } catch (error) {
        
        throw error;
    }
    };

    async getOneUser(id){

        try {
            const sql = 'SELECT * from user whrere user_id = ?';

            const result = await connection.query(
                [sql, id]
            );
            return result;

        } catch (error) {
            
            throw error;
        }
    };

    async createUser(user){

        try {

            const result = await connection.query(
                'call insert_user(?,?,?)',
                [user.username, user.password, user.role]
            );
            return result;
            
        } catch (error) {

            throw error;
            
        }
    }
    async loginUser(user){
        try {
            return await connection.query(
                `select check_user(?,?)`,
                [user.username, user.password]
            )
        } catch (error) {
            throw error;
        }
    }
}

export default new UserModel();