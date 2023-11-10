const express = require('express')
const router = express.Router();
const authController = require('../contoller/authContoller')
const blogController = require('../contoller/blogController');
const checkIsUserAuthenticated=require('../middleware/authMiddleware')
const multer = require('multer');

const storage = multer.diskStorage({

    destination :function (req,file,cb){
        cb(null, 'public/upload/');
    },
    filename: function(req,file,cb){
        cb(null,`${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({storage :storage});



 router.post("/user/register",authController.userRegistration);
 router.post("/user/login",authController.userLogin);

 //Protected Routes

 router.get("/get/allblogs",checkIsUserAuthenticated,blogController.getAllBlogs);
 router.post("/add/blog",upload.single("thumbnail"),checkIsUserAuthenticated,blogController.addNewBlog);
 router.get("/get/blog/:id",checkIsUserAuthenticated,blogController.getSingleBlogs);

//  router.get("/get/categories",checkIsUserAuthenticated,categoryController.getAllCategory);
//  router.post("/add/category",checkIsUserAuthenticated,categoryController.addNewCategory)

 
module.exports = router;