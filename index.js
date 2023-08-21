import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

let newTask = [];

app.get("/", (req, res) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let today = new Date();
    let day = today.toLocaleDateString('en-US', options);
    res.render("index.ejs", {currentDate : day, newItem: newTask});
});

app.post("/", (req, res) => {
    if(req.body["newItem"]){
        newTask.push(req.body["newItem"]);
    }
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});