const path=require('path')
const express=require('express')
const hbs=require('hbs')
const app=express()
const forecast = require('./utils/forecast.js')
const geocode=require('./utils/geocode.js')
const iplocation=require('./utils/ip.js')
// Defining Paths for express config
const publicDurPath=path.join(__dirname,'../public')
const viewPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')
// Handle Bars Engine and Path
app.set('view engine', 'hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)
// Static Path
app.use(express.static(publicDurPath))

app.get('',(req,res)=>{
    const ipaddress=req.headers['x-forwarded-for'] || req.socket.remoteAddress
    console.log(ipaddress)
    iplocation(ipaddress,(error,{country,city}={})=>{
        if(error){
            return res.render('index',{
                title:'Weather App',
                name:'Shivang',
                city:'Location',
                country:""
            })
        }
        return res.render('index',{
            title:'Weather App',
            name:'Shivang',
            city:city,
            country:country
        })
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        message:'Thank You for visitng. Any queries?',
        name:'Shivang'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Shivang'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'please provide an address'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({
                error})
        }
        
        forecast(latitude,longitude,(error,{temperature,rainfall,forecast}={})=>{
            if(error){
                return res.send({
                    error
                })
            }
            return res.send({
                forecast:forecast,
                temperature:temperature,
                location:location,
                address:req.query.address,
                rainfall
            })
        })
    })
})
app.get('/product',(req,res)=>{
    console.log(req.query)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        message:'Help Article Not Found',
        name:'Shivang'
    })
})
app.get('*',(req,res)=>{
    res.render('error',{
        message:'Page Not Found 404',
        name:'Shivang'
    })
})


app.listen(3000,()=>[
    console.log('Server is up on port 3000')
])