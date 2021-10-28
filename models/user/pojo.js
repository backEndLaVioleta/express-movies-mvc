
export default class User {

    userId = 'user_id';
    username = 'username';
    password = 'password';
    role = 'user';
    table = 'table';

    constructor(userId, username, role){
        this.userId = userId;
        this.username = username;
        this.role = role;
    }

    selectUser(){
        return `select ${this.username} from ${this.table} where ${this.userId}= ?`;
    };
}