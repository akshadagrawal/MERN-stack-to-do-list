const express= require('express');
const mongoose= require('mongoose');
const path = require('path');
const app =express();
const items= require('./routes/api/items');
const users= require('./routes/api/users');
const auth= require('./routes/api/auth');

const config= require('config');


//Body parser middleware

app.use(express.json());

//DB config

const db= config.get('mongoURI');

mongoose.connect(db,{ useNewUrlParser: true ,useUnifiedTopology: true, useCreateIndex:true })
    .then(()=> console.log("DataBase connection established"))
    .catch((err)=>console.log(err));

//Use routes

app.use('/api/items', items);
app.use('/api/users', users);
app.use('/api/auth', auth);



//Serve Static Assets in prod.

if(process.env.NODE_ENV == 'production'){
    //set Static folder
    app.use(express.static('client/build'));

    app.get('*',(req,res) =>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html' ))
    })
}


const port= process.env.PORT || 5000; //for deploying
app.listen(port,()=> console.log('Connection established'));   