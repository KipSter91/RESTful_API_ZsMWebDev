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
    contect: String
});

const Article = mongoose.model("Article", articleSchema);

app.get("/articles", (req, res) => {
    Article.find({})
        .then(foundItems => {
            console.log(foundItems);
        })
        .catch(err => {
            console.log(err);
        });
});

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});