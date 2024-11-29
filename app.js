const express=require('express');
const mongoose= require('mongoose');
const authRoutes=require('./routes/authRoutes');
const cookieParser=require('cookie-parser');
const {requireAuth, checkUser}= require('./middleware/authmiddleware');
const app= express();


app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

app.set('view engine', 'ejs');

const dbURI='mongodb+srv://Shivankar:aduGDLBOVFtjdM8h@cluster0.0d7esc6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

mongoose.connect(dbURI)
.then((result)=> app.listen(4000))
.catch((err)=> console.log(err));

app.get('*', checkUser);
app.get('/',(req,res)=> res.render('home'));
app.get('/smoothies', requireAuth, (req,res)=> res.render('smoothies'));
// app.get('/signup', (req,res)=>res.render('signup'));
// app.get('/login', (req,res)=>res.render('login'));
app.use(authRoutes);



