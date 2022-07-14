import express, { Request, Response } from 'express';

import { UserService } from '../domain/UserService';

export class UserController {
    public service: UserService;

    constructor() {
        this.service = new UserService();
    }

    public InitRoutes(app: express.Application): void {
        app.post('/api/login', this.login.bind(this))
            .post('/api/register', this.register.bind(this))
            .post('/api/validate', this.validate.bind(this))
    }

    public async login(req: Request, res: Response) {
        const token = await this.service.login(req.body.email, req.body.password);
        if (token == null)
            return res.sendStatus(400)
        res.end(token);
    }

    public async register(req: Request, res: Response) {
        const result = await this.service.register(req.body.email, req.body.password)
        res.sendStatus(result ? 200 : 400);
    }

    public async validate(req: Request,res: Response) {
        const result = await this.service.validate(req.body.token)
        res.sendStatus(result ? 200 : 400);
    } 
}