const blogModel = require("../models/blogModel");

const getAllBlogs = async (req, res) => {
  try {
    const fetchAllBlogs = await blogModel.find({user:req.user._id});
    
    res.status(200).json(fetchAllBlogs)
  } catch (error) {
    res.status(400).json({message:error.message});
  }
};

const addNewBlog = async (req, res) => {
 const {title,description} = req.body;
 try{
      if(title  && description){
         const savedBlog = await blogModel.create({
          title:title,
          description:description,
          thumbnail:req.file.filename,
          user:req.user._id      
         });
        if(savedBlog) {
          res.status(200).json({message:"blog added successfully"});
        }  
      }
      else{
        res.status(400).json({message:"All fields are required"});
      }
 }
 catch(error){
  res.status(400).json({message:error.message});
 }
    
};
const getSingleBlogs = async (req, res) => {
  const {id} = req.params;
  try{
       if(id){
          const fetchBlogByID = await blogModel.findById(id);
          res.status(200).json(fetchBlogByID);
       }
       else{
        res.status(400).json({message:"Invalid URL"});
       }
  }
  catch(error){
    res.status(400).json({message:error.message});
  }
};

module.exports = {
  getAllBlogs,
  addNewBlog,
  getSingleBlogs,
};
