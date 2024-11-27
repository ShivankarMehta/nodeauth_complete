const express=require('express');
const mongoose= require('mongoose');
const authRoutes=require('./routes/authRoutes');
const cookieParser=require('cookie-parser');
const app= express();


app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

app.set('view engine', 'ejs');

const dbURI='mongodb+srv://Shivankar:aduGDLBOVFtjdM8h@cluster0.0d7esc6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

mongoose.connect(dbURI)
.then((result)=> app.listen(4000))
.catch((err)=> console.log(err));

app.get('/',(req,res)=> res.render('home'));
app.get('/smoothies', (req,res)=> res.render('smoothies'));
// app.get('/signup', (req,res)=>res.render('signup'));
// app.get('/login', (req,res)=>res.render('login'));
app.use(authRoutes);

app.get('/set-cookies', (req,res)=>{
// res.setHeader('Set-Cookie','newUser=true');
res.cookie('newuser', false);
res.cookie('isEmployee',true,{maxAge: 1000*60*60*24,httpOnly:true});
res.send('you got the cookies');
})

app.get('/read-cookies', (req,res)=>{
const cookies=req.cookies;
console.log(cookies);
res.json(cookies);
})

