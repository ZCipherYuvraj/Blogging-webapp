const bodyParser = require("body-parser");
const express = require("express");

const fs = require("fs");


const app = express();
app.use(express.json());
const port = 3000;

// Initialize Firebase









// Increase the limit for EventEmitter listeners


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

let blogs = [];
const loadBlogs = () => {
    try {
        const data = fs.readFileSync("blogs.json");
        blogs = JSON.parse(data);
    } catch (error) {
        blogs = [];
    }
};
loadBlogs();

const saveBlogs = () => {
    fs.writeFileSync("blogs.json", JSON.stringify(blogs, null, 2));
};

app.get("/", (req, res) => {
    res.render("login");
});



app.get("/signup", (req, res) => {
    res.render("signup");
});

app.get("/dashboard", (req, res) => {
    res.render("index", { blogs });
});

app.get("/create", (req, res) => {
    res.render("create.ejs");
});

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

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
