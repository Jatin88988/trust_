const express = require('express')
const cors = require('cors')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const PORT=80
const db = require("./db.js")
const router = require('./routes')

//database connection
db.connect();

app.use(bodyParser.json({ limit: "50mb"}))
// app.use(bodyParser.js)
app.use(bodyParser.urlencoded({extended: true, limit:"50mb"}))

//routes
app.use("/api", router);

app.use((req,res,next) => {
    req.header("Access-Control-Allow-Origin", "*")
        req.header("Access-Control-Allow-Headers", "*")
    next()
})


app.use('/uploads', express.static(path.join(__dirname, "/../uploads")))
app.use(express.static(path.join(__dirname, "/../frontend/build")))


app.get("*", (req,res)=> {
    try{
        res.sendFile(path.join(__dirname,'/../frontend','build','index.html'));
    } catch(e) {
        res.send(e)
    }
    // res.send("i work");
})

app.use(cors())

app.listen(process.env.PORT || PORT,()=>{
    console.log(`Listening on port no ${PORT} `)
})