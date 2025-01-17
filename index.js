import express from "express"
import DataStore from"nedb"
import fetch from "node-fetch"
import dotenv from 'dotenv'

dotenv.config()


const app =  express()

const db = new DataStore("database.db")
db.loadDatabase()

const port = process.env.PORT || 3000

app.listen(port,()=>{
    console.log(` listening at ${port}`)
})

app.use(express.static("public"))
app.use(express.json({limit : '1mb'}))

app.post("/api",(request, response)=>{

    db.insert(request.body)
    response.json(request.body)
})

app.get("/api",(request,response)=>{
    db.find("",(err,doc)=>{
        response.json(doc)
    })
    response.closed
})

app.get("/weather/:latlon",async (request,response)=>{
    const latlon = request.params .latlon.split(',')

    const lat = latlon[0]
    const lon = latlon[1]

    // const key = process.env.API_KEY
const key = '46875b2080b14c61919112959250601'
    const API = `http://api.weatherapi.com/v1/current.json?key=${key}&q=${lat},${lon}&aqi=no`

    const response_weather = await fetch(API)
    const data = await response_weather.json()
    console.log(data)

    response.json(data)


})




