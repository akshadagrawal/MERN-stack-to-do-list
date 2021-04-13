const express= require('express');
const mongoose= require('mongoose');
const bodyParser= require('body-parser');
const path = require('path');
const app =express();
const items= require('./routes/api/items');

//Body parser middleware

app.use(bodyParser.json());

//DB config

const db= require('./config/keys').mongoURI;
mongoose.connect(db,{ useNewUrlParser: true ,useUnifiedTopology: true })
    .then(()=> console.log("DataBase connection established"))
    .catch((err)=>console.log(err));

//Use routes

app.use('/api/items', items);

//Serve Static Assets in prod.

if(process.env.NODE_ENV == 'production'){
    //set Static folder
    app.use(express.static('client/build'));

    app.get('*',(req,res) =>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html' ))
    })
}


const port= process.env.PORT || 6000; //for deploying
app.listen(port,'0.0.0.0',()=> console.log('Connection established')); 