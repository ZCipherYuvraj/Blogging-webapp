import bodyParser from "body-parser";
import express from "express";
import fs from "fs";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended:true}));


app.use(express.static("public"));
app.set("view engine","ejs");

let blogs = [];
const loadBlogs = ()=>{
    try{
        const data = fs.readFileSync("blogs.json");
        blogs= JSON.parse(data);
    } catch (error){
        blogs = [];
    }
};
loadBlogs();
const saveBlogs = () => {
    fs.writeFileSync("blogs.json", JSON.stringify(blogs, null, 2));
};
app.get("/",(req,res)=>{
    res.render("login.ejs");
});
app.post("/login",(req,res)=>{
    res.redirect("/dashboard");
});

app.get("/dashboard",(req,res)=>{
    res.render("index",{blogs});
})

app.get("/create",(req,res)=>{
    res.render("create.ejs");
})
app.post("/submit", (req, res) => {
    const { title, content } = req.body;
    if (title && content) {
        const newBlog = { 
            id: Date.now().toString(), // Unique ID 
            title, 
            content, 
            date: new Date().toLocaleString() 
        };
        blogs.unshift(newBlog);
        saveBlogs();
        res.redirect("/dashboard");
    } else {
        res.send("Title and content are required");
    }
});

// Delete Blog
app.post("/delete/:id", (req, res) => {
    const postId = req.params.id;
    blogs = blogs.filter(post => post.id !== postId);
    saveBlogs();
    res.redirect("/dashboard");
});

app.listen(port,()=>{
    console.log( `server is running on port ${port}`);
}) 