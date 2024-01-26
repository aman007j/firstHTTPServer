express = require("express");
z = require("zod");
app = express();

app.use(express.json());

schema1 = z.string().email()
//schema2 = z.string().min(6)

const passwordSchema = z.string().refine(password => {    // HOW TO SET RESTRICTIONS ON PASSWORD USING ZOD
    // Check for at least one capital letter, one special character, and a minimum length of 8
    return /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,}$/.test(password);
}, { message: "Password must contain at least one capital letter, one special character, and be at least 8 characters long" });


function credentials(req, res, next) {
    email = req.body.email
    password = req.body.password

    response1 = schema1.safeParse(email)
    response2 = passwordSchema.safeParse(password)

    if(!(response1.success == true)) {
        res.send("Email is invalid")
    }
    else if(!(response2.success == true)) {
        res.send(response2.error.errors[0].message);
    }
    else {
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