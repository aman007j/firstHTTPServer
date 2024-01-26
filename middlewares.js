express = require("express");

app = express();

app.use(express.json());

let noOfRequests = 0;
function serverRequests(req, res, next) {    // Basically we are counting the no of requests coming in our server.
    noOfRequests += 1;
    console.log(noOfRequests);
    next();
}


function credentials(req, res, next) {   // created a middleware
    username = req.headers.username
    password = req.headers.password

    if(!(username == "aman" && password == "1234678")) {
        res.status(403).send("Username or password incorrect");
    }
    else{
        next();
    }
}

app.get("/hospital-server/login", serverRequests, credentials, (req, res) => {

    res.json({
        msg: "Succesfully login into hospital server"
    })
})


//global catches
app.use((err, req, res, next) => {
   // console.error(err) // for debugging
   res.status(500).send("An internal error occured")
})




app.listen(3000, function() {
    console.log("server is listening on port 3000")
});