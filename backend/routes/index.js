var express = require('express');
var router = express.Router();
var userModel=require("../models/userModel")
var blogModel=require("../models/blogModel")
var bcryptjs=require('bcryptjs')
const multer  = require('multer')
const path=require('path')
var jwt=require('jsonwebtoken')


const secret="secretBlog"

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/signUp",async (req,res)=>{
  let {username,name,email,password}=req.body;
  let emailCon=await userModel.findOne({email:email});
  if(emailCon)
  {
    return res.json({
      success:false,
      msg:"Email already exists"
    });
  }
  else{
    bcryptjs.genSalt(12, (err, salt) => {
  bcryptjs.hash(password, salt,async function (err, hash) {
    // Store hash in your password DB
    if (err)
      throw err;
    let user=await userModel.create({
      username: username,
      name: name,
      email: email,
      password: hash,
    });

    return res.json({
      success:true,
      msg: "User Created Successfully",
    });
  });
});
  }
});

router.post("/login",async(req,res)=>{
  let {email,password}=req.body;
  let user=await userModel.findOne({email:email});
  if(!user)
  {
    return res.json({
      success: false,
      msg: "User not found"
    });

  }
  else{
    bcryptjs.compare(password,user.password,function(err,result){
      if(result){
        let token=jwt.sign({userId: user._id},secret);
        return res.json({
          success: true,
          msg: "User logged in successfully",
          token:token
        });
      }
      else{
        return res.json({
          success: false,
          msg: "Invalid password"
        })
      }
    })
  }

});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const extName=path.extname(file.originalname) 
    cb(null, file.fieldname + '-' + uniqueSuffix + extName)
  }
})

const upload = multer({ storage: storage });

// Route to Upload Blog
router.post("/uploadBlog", upload.single('image'), async (req, res) => {
  // const { title, content, token, desc } = req.body;
  // const image = req.file?req.file.filename:null; // 👈 Get uploaded filename from multer

  try {
    let {token,title,desc,image,content}=req.body;
    const imageFile = req.file?req.file.filename:null;

    const decoded = jwt.verify(token, secret);
    const user = await userModel.findOne({ _id: decoded.userId });

    if (!user) {
      return res.json({
        success: false,
        msg: "User not found"
      });
    }

    const blog = await blogModel.create({
      title,
      content,
      image: imageFile,
      desc,
      user: user._id
    });

    return res.json({
      success: true,
      msg: "Blog uploaded successfully",
      blog
    });

  } catch (err) {
    console.error(err);
    return res.json({
      success: false,
      msg: "Something went wrong",
      error: err.message
    });
  }
});

router.post("/getBlogs",async (req,res)=>{
  
  let {token}=req.body;
  let decoded=jwt.verify(token,secret);

  let user=await userModel.findOne({_id:decoded.userId});
  if(!user)
  {
    return res.json({
      success: false,
      msg: "User not found"
    });
  }
  else{
    let blogs=await blogModel.find({});
    return res.json({
      success: true,
      msg: "Blogs fetched successfully",
      blogs: blogs
    })
  }

})

router.post("/getBlog",async (req,res)=>{
  let {token,blogId}=req.body;
  let decoded=jwt.verify(token,secret);
  let user=await userModel.findOne({_id:decoded.userId});

  if(!user)
  {
    return res.json({
      success: false,
      msg: "User not found"
    })
  }
  else{
    let blog=await blogModel.findOne({_id:blogId});
    return res.json({
      success: true,
      msg: "Blog fetched successfully ",
      blog: blog
    })
  }
});

module.exports = router;