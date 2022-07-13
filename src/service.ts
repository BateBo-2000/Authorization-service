import { Application } from "express";
import { PoolClusterOptions } from "mysql2";
const pool = require('./connection_pool');


function a(app: Application, ) {
    app.post('/',async(req, res) => {
        const promisePool = pool.promise();
        const [rows, fields] = await promisePool.query("SELECT * from users")
        console.log(rows)
        res.status(200).send(rows)
    })
}