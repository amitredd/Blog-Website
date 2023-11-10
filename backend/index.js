const express = require ('express');
const connectToMongo=require('./config/db.js')
const authRoutes = require('./routes/blog.js')
const cors = require('cors');
const app= express();
const PORT=5000;



connectToMongo();

app.use(cors());
app.use(express.json())
app.use(express.static("public/upload"));



app.get("/",(req,res)=>{
    res.send("API RUNNING")
})

//API ROUTES
app.use("/api/v1",authRoutes)


app.listen(PORT,()=>{
    console.log(`API is running on http://localhost:${PORT}`)
})

