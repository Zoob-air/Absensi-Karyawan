require('dotenv').config();
const express=require('express');
const session=require('express-session');
const bodyParser=require('body-parser');
const path=require('path');
const hbs=require('hbs');
const app=express();

app.set('view engine','hbs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({secret:process.env.SESSION_SECRET,resave:false,saveUninitialized:false}));

app.use(require('./routes/auth'));
app.use(require('./routes/admin'));
app.use(require('./routes/pekerja'));


app.listen(process.env.PORT||3000,()=>console.log('Server running'));
