const jwt = require('jsonwebtoken');
const authModel = require('../models/authModel');

const checkIsUserAuthenticated = async (req,res,next)=>{

 let token;
 const {authorization} = req.headers;
 if(authorization && authorization.startsWith("Bearer")){
   try{
    token = authorization.split(" ")[1];
   const {userId} = jwt.verify(token,"secretkey"); //if verify fails error in catch block executed, else extracts info from payload

   req.user = await authModel.findById(userId).select("--password"); //Custom properties  added to the req object exclusing the password

   next();
   }
   catch(error){
    res.status(401).json({message:"unAuthorized User"});
   }
 }
 else{
    res.status(401).json({message:"unAuthorized User"});
 }

}

module.exports = checkIsUserAuthenticated;




