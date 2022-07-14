import { pool } from './ConnectionPool';
import { UserEntity } from "./entities/UserEntity";


export class UserRepository {
    async getUserByemail(email: string): Promise<UserEntity | null> {
        const promisePool = pool.promise();
        const [rows, fields] = await promisePool.query("SELECT * from users WHERE email = ? ", [email])

        if (rows.length > 0) {
            return new UserEntity(
                rows[0].id,
                email,
                rows[0].password,
                rows[0].salt
            )
        } else {
            return null
        }
    }

    async checkIfUserExistsByemail(email: string): Promise<boolean> {
        const promisePool = pool.promise();
        const [rows, fields] = await promisePool.query("SELECT email from users WHERE email = ?", [email])
        return rows.length != 0;
    }

    async addUser(email: string, password: string, salt:string): Promise<boolean> {
        try {
            const promisePool = pool.promise();
            await promisePool.query("INSERT INTO users (email,password,salt) VALUES (?,?,?)", [email, password, salt])
            return true;
        } catch {
            return false
        }
    }

}