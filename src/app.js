const express = require('express');
const path = require('path')
const hbs = require('hbs')
const app = express()
const obj = require('./utils/help.js')
const dir=path.join(__dirname,'../public');
const viewspath=path.join(__dirname,'../templates/views')
const partialpath=path.join(__dirname,'../templates/partials')

 console.log(__dirname,path.join(__dirname,'../public'));
app.use(express.static(dir))

app.set('view engine','hbs');
app.set('views',viewspath);
hbs.registerPartials(partialpath);
app.get("",(req,res)=>{
    res.render("index",{
        title : "weather app",
        name : "rohit"
    })
})

app.get('',(req,res)=>
{
    res.send("hello");
})
app.get('/help',(req,res)=>
{
    res.send("<h1>help</h1>");
})
app.get('/about',(req,res)=>
{
    res.render('about')
})
app.get('/index',(req,res)=>
{
    res.render('index')
})
app.get('/info',(req,res)=>
{
    if(!req.query.search)
    {
        return res.send({
        error:"you missed the query"
            }
        )
    }
   obj.temp(req.query.search,(data=0)=>
   {
       res.send({
           temperature : data[0],
           country: data[1],
           state : data[2],
           timezone : data[3],
           address : req.query.search
           
       })
   })
})

app.listen(3000,()=>
{
    console.log("server is up  //");
})

