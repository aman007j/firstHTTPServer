express = require("express");
z = require("zod");
app = express();

app.use(express.json());

schema = z.object({
    email: z.string().email(),
    password: z.string().min(8)   //z.literal("1") ==> exactly 1 
})

function credentials(req, res, next) {
    
    response = schema.safeParse(req.body)
    if(!(response.success == true)) {
        console.log(response)
        res.send("Invalid email or password")
    }
    else{
        next();
    }

}

app.get("/hospital-server/Signup", credentials, (req, res) => {

    res.json({
        email: req.body.email,
        password: req.body.password,
        msg: "Succesfully entered into hospital server"
    })
})


app.listen(3000, function() {
    console.log("server is listening on port 3000")
});