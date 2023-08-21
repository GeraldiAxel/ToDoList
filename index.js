import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

let newTask = [];
let newTaskMonthly = [];

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

app.get("/monthly", (req, res) => {
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    let today = new Date();
    let month = months[today.getMonth()];
    res.render("monthly.ejs", {currentDate : month, newMonthlyItem: newTaskMonthly});
});

app.post("/monthly", (req, res) => {
    if(req.body["newMonthlyItem"]){
        newTaskMonthly.push(req.body["newMonthlyItem"]);
    }
    res.redirect("/monthly");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});