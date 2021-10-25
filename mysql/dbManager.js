// metodos para interaccionar con la base de datos
// este NO será el movies model
import mysql from 'mysql2/promise';
import {config} from '../config.js';


class MySqlManager {

    constructor(config){

        this.db = config.db;
    };
    // create connectiopn private
    async _createConnection(db){
        try {
            
            this.connection = await mysql.createConnection(db);
        } catch (error) {
            console.log(error);
        }
    };

    // drop connection
   async _dropConnection(){
       this.connection.end();
    };

    // query
     async query(sql, params){

        try {
            await this._createConnection(this.db);

           const [results,field] = await this.connection.execute(sql, params);

           await this._dropConnection();

           return results;
        } catch (error) {
            console.log(error);
        }
    };
}

export default new MySqlManager(config);