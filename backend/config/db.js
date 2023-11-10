const mongoose = require('mongoose');
const url= 'mongodb://0.0.0.0:27017/blog-mern-project';

const connectToMongo = async()=>{
      
    const res = await mongoose.connect(url);
    if(res){
        console.log("Connect to MongoDB")
    }
}


module.exports = connectToMongo;