import Express from 'express';
import dotenv from 'dotenv/config';
import {UserController} from './controllers/UserController'

const app = Express()
app.use(Express.json())

const user = new UserController();
user.InitRoutes(app);

app.listen(Number(process.env.PORT),
    () => {
        console.log("Server listening on Port", process.env.PORT);
    })