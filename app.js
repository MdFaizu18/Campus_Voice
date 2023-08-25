const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

// import {dirname} from "path";
// import { fileURLToPath } from "url";
// const __dirname = dirname(fileURLToPath(import.meta.url));



// setting up the port and express const 
const app = express();
const port = 5000;
const contents =[];

// setting ejs as a view engine 
app.set('view engine', 'ejs');

// for request from website and access the documents in public 
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("Public"))

var userIsAuthorised=false;
var adminIsAuthorised=false;

// for getting user as student 
function userCheck(req,res,next) {
    const user = req.body["user"];
    if(user==="student"){
        userIsAuthorised=true;
    }
    next();
}
app.use(userCheck)


// for getting user as admin 
function adminCheck(req,res,next) {
    const user1 = req.body["user"];
    if(user1==="admin"){
        adminIsAuthorised=true;
    }
    next();
}
app.use(adminCheck);


// getting request from the form 
app.post("/student", (req,res)=>{
    const password = req.body['password'];
    
    if(userIsAuthorised && password==611621404058 ){
        userIsAuthorised="false";  
        res.render('student.ejs');
        userIsAuthorised="false";
    }


    if (adminIsAuthorised  && password==12345 ) {
        adminIsAuthorised="false";
        res.render('admin.ejs' , {contents:contents})     
    }
   
    else{
        res.redirect('/');
    } 
})


// Routes:---------------->
app.get("/", (req,res)=>{
    res.render('login.ejs')
})

app.get("/student", (req,res)=>{
    res.render('student.ejs' );  
})

app.get("/admin", (req,res)=>{
    res.render('admin.ejs', {contents:contents}); 
})

app.get("/contact", (req,res)=>{
    res.render('contact.ejs');  
})

app.get("/about", (req,res)=>{
    res.render('about.ejs');  
})

app.get("/compose", (req,res)=>{
    res.render('compose.ejs');
})

app.get("/login", (req,res)=>{
    res.render('login.ejs');
})

app.post('/compose' ,(req,res)=>{
    const post = {
        name:req.body.userName,
        year:req.body.userYear,
        degree:req.body.userDegree,
        message:req.body.userMessage
    };
    contents.push(post);
    console.log(contents);
    res.redirect("/student");
   });


// to know which port is currenty listening 
app.listen(port,()=>{
    console.log(`Server is running in port ${port}`)
})


// Being an MIT student I can proudly say that it's one of the best institutions where you can able to learn whatever knowledge it is overall faculty members are good and it has nothing but something better than other colleges where they are providing placement training in our own campus and if we utilize it properly really you are going to rssucceed one day...Thank You