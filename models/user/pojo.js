
export default class User {

    userId = 'user_id';
    username = 'username';
    password = 'password';
    role = 'user';
    table = 'table';

    constructor(userId, username, role, table){
        
        this.userId     = userId;
        this.username   = username;
        this.role       = role;
        this.table      = table;
    }

    selectUser(){
        return `select ${this.username} from ${this.table} where ${this.userId}= ?`;
    };
}