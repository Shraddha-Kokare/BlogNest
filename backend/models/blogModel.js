const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://kokareshraddha5:kokareshraddha5@cluster0.syk17gx.mongodb.net/Blog?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("MongoDB connected"))
  .catch(err => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });

const blogSchema=new mongoose.Schema({
    title: String,
    desc: String,
    image: String,
    content: String,
    date: {
        type: Date,
        default: Date.now,
    }
});

const blogModel=mongoose.model("blog",blogSchema);

module.exports=blogModel;