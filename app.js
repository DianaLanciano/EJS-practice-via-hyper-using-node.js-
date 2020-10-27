//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');

const homeStartingContent = "Lacus velmet vels at erat pellentesque adipiscing.";
const aboutContent = "Hac  condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae.pis massa tincidunt dui.";
const contactContent = "Snsec sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
let posts = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/",(req,res)=>{
  res.render("home",{startingContent:homeStartingContent+aboutContent+contactContent,
    posts:posts
  });//rendering ejs file

});
app.get("/about",(req,res)=>{
  res.render("about",{startingContent:homeStartingContent+aboutContent+contactContent});//rendering ejs file
});
app.get("/contact",(req,res)=>{
  res.render("contact",{startingContent:homeStartingContent+aboutContent+contactContent});//rendering ejs file
});
app.get("/compose",(req,res)=>{
  res.render("compose");//rendering ejs file
});


app.post("/compose",(req,res)=>{

  const userPost = {
    title: req.body.titleFromUser,
    content: req.body.postBody
  };
  posts.push(userPost);
  res.redirect("/");

});

app.get("/posts/:postName", function (req, res) {
const requestedTitle = _.lowerCase(req.params.postName);

posts.forEach(function(post){
  var title = _.lowerCase(post.title);
  if(title === requestedTitle){
    res.render("post",{title:post.title,
      content:post.content
    });
  }
})
});





app.listen(3000, function() {
  console.log("Server started on port 3000");
});
