// In this, we are trying to calculate the average time our server is taking to handle requests using (Date.now)

express = require("express");
app = express();
app.use(express.json());

let startTime;

function initialTime(req, res, next){
    startTime = Date.now();
    next();
}

function finalTime(req, res){
    let endTime = Date.now();
    let time = endTime - startTime;
    time = time/1000;

    console.log(time, "seconds");
}


app.get("/", initialTime, (req, res, next) => {
    res.status(200).send("Hello! World");
    next();
}, finalTime)



app.listen(3000, () => {
    console.log("server is running on port 3000");
})
