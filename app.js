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

/////request targeting all articles/////

app.route("/articles")

    .get((req, res) => {
        Article.find({})
            .then(foundArticles => {
                res.send(foundArticles);
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
            .catch((err) => {
                console.log(err);
            });
    })

    .delete((req, res) => {
        Article.deleteMany({})
            .then(() => {
                res.send("All articles deleted.")
            })
            .catch((err) => {
                console.log(err);
            });
    });

/////request targeting a specific article/////

app.route("/articles/:articleTitle")

    .get((req, res) => {

        Article.findOne({ title: req.params.articleTitle })
            .then((foundArticle) => {
                if (foundArticle) {
                    res.send(foundItem)
                } else {
                    res.send("No articles matching that title was found.")
                }
            })
            .catch((err) => {
                console.log(err);
            });
    })

    .put((req, res) => {
        Article.updateOne(
            { title: req.params.articleTitle },
            { title: req.body.title, content: req.body.content },
        )
            .then(() => {
                res.send("1 article is succesfully updated.")
            })
            .catch((err) => {
                console.log(err);
            });
    });

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});