const mongoose = require('mongoose');
const url= 'mongodb+srv://amitsatyaram:Football2001$1234@blog.k0zstan.mongodb.net/BlogDB?retryWrites=true&w=majority';

const connectToMongo = async()=>{
      
    const res = await mongoose.connect(url);
    if(res){
        console.log("Connect to MongoDB")
    }
}


module.exports = connectToMongo;
