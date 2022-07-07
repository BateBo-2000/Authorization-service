import Express from 'express';

const app = Express()

console.log("success")
app.get('/', (req, res) => {
    res.status(200).end('succeed')
})

app.listen(3000)
