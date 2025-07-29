const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://kokareshraddha5:kokareshraddha5@cluster0.syk17gx.mongodb.net/Blog?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("MongoDB connected"))
  .catch(err => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });


// connectDB();
    // await mongoose.connect("mongodb+srv://kokareshraddha5:kokareshraddha5@cluster0.syk17gx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {


const userSchema=new mongoose.Schema({
    username: String,
    name: String,
    email: String,
    password: String,
    isAdmin:{
        type: Boolean,
        default:false
    },
    date:{
        type: Date,
        default: Date.now,
    }
});

const userModel=mongoose.model("user",userSchema);

module.exports=userModel;