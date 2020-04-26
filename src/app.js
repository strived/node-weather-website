const request=require('request')

const geoCode = require('./utils/geocode')

const forecast = require('./utils/forecast')

const path=require('path')
const express= require('express')
const hbs=require('hbs')

const app=express()
//define paths for express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewPath=path.join(__dirname,'../template/views')
const partialsPath=path.join(__dirname,'../template/partials')
//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)
// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
       res.render('index',{
           title:'Weather',
           name:'Sandeep Trivedi'
       })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Sandeep Trivedi'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        helpText:'This is help text',
        name:'Sandeep Trivedi'
    })
})
 app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {

       return res.send({ errorMessage:'Please provide address.'})
    }

    geoCode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error)
        {
            return res.send({ errorMessage:error}) 
        }
      
    
       forecast(latitude,longitude,(forecastError,forecastData)=>{
        if(forecastError)
        {
            return res.send({ errorMessage:forecastError})  
        }
        res.send({
            address:req.query.address,
            forecast:forecastData,
            location: location
        })
      
    })
    })
    
   

 })

 app.get('/products',(req,res)=>{
   
    if(!req.query.search)
    {

       return res.send({ errorMessage:'Please provide search term.'})
    }

   console.log(req.query.search)
    res.send({
        product:[]
    })

 })

 app.get('/help/*',(req,res)=>{
    res.render('error',{
        title:'404',
        name:'Sandeep Trivedi',
        errorMessage:'Help ariticals not found'
    })
    
})

 app.get('*',(req,res)=>{
    res.render('error',{
        title:'404',
        name:'Sandeep Trivedi',
        errorMessage:'404 page'
    })  
   
 })
//app.com
// app.com/help
// app.com/about

app.listen(3000,()=>{
    console.log('Server is up on port 3000')
})