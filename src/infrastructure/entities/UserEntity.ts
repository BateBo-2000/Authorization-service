export class UserEntity {
    id: number;
    email: string;
    password: string;
    salt: string;

    constructor(id: number, email: string, password: string, salt: string) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.salt = salt;
    }
}
