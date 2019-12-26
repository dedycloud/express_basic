import express from 'express';
const app =express();
const port=3000;
let handleNotFound = (req,res)=>{res.status(404).send(`<center><h1>NOT FOUND</h1></center>`)}

let handleRequest = (req,res)=>{
    const {query,params,body}=req;
    res.json( { message:`Request ${req.method} to ${req.originalUrl}`,query,params,body})};

app.use(express.json());
app.use(express.urlencoded());
app.get('/',(req,res)=> res.send('hello express!'));
app.get('/posts/:category?',handleRequest); //number 2
app.get('/posts/:category/:author',handleRequest); //number 3
app.get('/train/routes',handleRequest)//number 4
app.get('/users/:gender(male|female)',handleRequest); //number 6
app.get( '/users/:userId(\\d+)', handleRequest ); //number 5
app.get('/users/:username',handleRequest);//number 1

express().get
app.use(handleNotFound);

app.listen(port,()=>{
    console.log(`My app listening on port ${port} !`);
});

