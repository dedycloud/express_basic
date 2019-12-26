import express from 'express';
const app =express();
const port=3000;
let handleNotFound = (req,res)=>{res.status(404).send(`<center><h1>NOT FOUND</h1></center>`)}

let handleRequest = (req,res)=>{
    console.log("req dipanggil");
    res.json(`<h1>Request ${req.method} to ${req.originalUrl}.</h1>`)};

let handleRequestTry = (req,res)=>{
    console.log("req dipanggil");
    res.json(`<h1>Request ${req.method} to ${req.originalUrl}, content ${req.body}, params ${req.params.id}, query ${req.query.name} .</h1>`)};

app.use(express.json());
app.use(express.urlencoded());
app.get('/',(req,res)=> res.send('hello express!'));
app.get('/hello',handleRequestTry);
app.get('/hello/dedy',(req,res)=> res.send('hello express 233! '));
app.get('/hello.json',(req,res)=>res.json({hello:'express!'}));
app.post('/hello',handleRequestTry)
app.get('/hello/:id',handleRequestTry)
app.put('/hello',handleRequest)
app.delete('/hello',handleRequest)
app.patch('/hello',handleRequest)
express().get
app.use(handleNotFound);

app.listen(port,()=>{
    console.log(`My app listening on port ${port} !`);
});