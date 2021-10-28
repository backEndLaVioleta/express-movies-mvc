import User from '../user/pojo.js';
import connection from '../../mysql/dbManager.js';


class UserDao {

    // user from pojo
     userPojo = new User();

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
             const sql = this.userPojo.selectUser();
 
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
             
         }
     }
 }
 
 export default new UserDao();