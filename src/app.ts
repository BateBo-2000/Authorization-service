import Express from 'express';
import dotenv from 'dotenv';
const pool = require('./connection_pool');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
dotenv.config()

const app = Express()
app.use(Express.json())


app.post('/login',async(req, res) => {
    const promisePool = pool.promise();
    const [rows, fields] = await promisePool.query( "SELECT * from users WHERE username = ? ",[req.body.username])
    const hashedPassword = await bcrypt.hash(req.body.password, rows[0].salt)

    if(rows.length == 1 && hashedPassword == rows[0].password){
        const user = { id: rows[0].id}
        const token =await jwt.sign(user, process.env.SECRET_JWT)
        return res.send(token)
    }
    res.sendStatus(404)
})


app.post('/registration',async(req, res) => {
    const promisePool = pool.promise();
    const [rows, fields] = await promisePool.query( "SELECT username from users WHERE username = ?",[req.body.username])
    
    if(rows.length){
        return res.status(422).send('username taken')
    }else{
        const salt = await bcrypt.genSalt()
        console.log(salt)
        const hashedPassword = await bcrypt.hash(req.body.password,salt)
        promisePool.query("use TOSHKO")
        promisePool.query("INSERT INTO users (username,password,salt) VALUES (?,?,?)",[req.body.username, hashedPassword, salt])

    }

    return res.sendStatus(200)
})





app.post('/a', (req, res) => {

    // console.log(req.query)
    // console.log("params")
    // console.log(req.params)
    // console.log(req.statusCode)
    console.log(req.body)
    console.log(req.body.username)
    res.status(200).send(req.body)
})



app.listen(Number(process.env.PORT),
    () => {
        console.log("Server listening on Port", Number(process.env.PORT));
    })
