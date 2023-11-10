const authModel = require("../models/authModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

const userRegistration = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (username && email && password) {
      // If all details are present

      const isUser = await authModel.findOne({ email: email }); //for checking if user already exists?
      if (!isUser) {
        //password hashing
        const genSalt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, genSalt);

        //Save a user in DB
        // const newUser = new authModel({
        //   username: username,
        //   email: email,
        //   password: password,
        // });
        // const savedUser = await newUser.save();
                //(OR)
        //We can also use create          
        const savedUser=await authModel.create({
            username: username,
            email: email,
            password: hashedPassword,
        });

        if (savedUser) {
          res.status(200).json({ message: "User Registration Successfull" });
        }
      } else {
        res.status(400).json({ message: "Email already exists" });
      }
    } else {
      res.status(400).json({ message: "all fields are required" }); // if some details are missing
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
//Same logic as above register setup
const userLogin = async (req, res) => {
    const {email,password} = req.body;

    try{
          if(email && password){
            const isEmail = await authModel.findOne({email:email});
            if(isEmail){
                 if( await bcrypt.compare(password,isEmail.password)){
                    //Logged In -> Time to generate the token for user
  
                    const token = jwt.sign({userId: isEmail._id},"secretkey",{
                        expiresIn: "2d"
                    });
                    res.status(200).json({ message: "User logged in succesfully", token:token, name: isEmail.username});
                 }
                 else{
                    res.status(400).json({ message: "Invalid Credentials" });
                 }
            }
            else{
                res.status(400).json({ message: "Email ID is not registered" });
            } 
          }
          else{
            res.status(400).json({ message: "all fields are required" });
          }
    }
    catch(error){
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
  userRegistration,
  userLogin,
};
