import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

import { UserRepository } from "../infrastructure/UserRepository";

export class UserService {
    private repo: UserRepository;

    constructor() {
        this.repo = new UserRepository();
    }
    public async login(email: string, password: string): Promise<string | null> {
        const user = await this.repo.getUserByemail(email)
        if (user == null)
            return null;

        const hashedPassword = await bcrypt.hash(password, user.salt)
        if (hashedPassword == user.password) {
            const token = await jwt.sign({ id: user.id }, process.env.SECRET_JWT!, {algorithm: 'HS256'})
            return token;
        }
        return null;
    }

    public async register(email: string, password: string): Promise<boolean> {
        const exists = await this.repo.checkIfUserExistsByemail(email)

        if (exists)
            return false

        const saltRounds = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, saltRounds)
        this.repo.addUser(email, hashedPassword, saltRounds)
        return true
    }

    public async validate(token: string): Promise<boolean> {
        try {
            const secret = process.env.SECRET_JWT
            const verfication = jwt.verify(token, secret!, { algorithms: ['HS256'] })
            return true
        } catch {
            return false
        }
    }
}