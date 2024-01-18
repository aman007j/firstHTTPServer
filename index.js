express = require("express");

app = express();

function Sum(a, b)
{
    let ans = parseFloat(a) +parseFloat(b);
    return ans;
}

// req, res => request, response
app.get('/', function(req, res){
    let a = req.query.a;
    let b = req.query.b;
    let ans = Sum(a, b);
    console.log(ans);
    res.send(ans.toString());
});

const port1 = 3000;
app.listen(port1, () => {
    console.log(`Server is running on port ${port1}`);
});




