const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const port = "3000";

const app = express();

app.set('view engine', "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect('mongodb://127.0.0.1:27017/WikiDB', {
    useNewUrlParser: true,
    UseUnifiedTopology: true
});

const articleSchema = new mongoose.Schema({
    title: String,
    content: String
});

const Article = mongoose.model("Article", articleSchema);

app.route("/articles")

.get((req, res) => {
    Article.find({})
        .then(foundItems => {
            res.send(foundItems);
        })
        .catch(err => {
            console.log(err);
        });
})

.post((req, res) => {

    const newArticle = new Article({
        title: req.body.title,
        content: req.body.content
    })

    newArticle.save()
        .then(() => {
            res.send("Succesfully added a new article.")
        })
        .catch ((err) => {
            console.log(err);
        });
})

.delete((req, res) => {
    Article.deleteMany({})
    .then (() => {
        res.send("All articles deleted.")
    })
    .catch ((err) => {
        console.log(err);
    });
});

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});