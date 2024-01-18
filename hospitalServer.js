// Trying to create a hospital sever which records the no of kidneys and their health status of a patient.


express = require("express");
bodyParser = require("body-parser");
app = express();

let users = [{
    name: 'Aman',
    kidneys: [{
        healthy: true  // When we restart the process our in memory data gets reset that's why we need databases.
    }, {
        healthy: false
    }]
}]

app.use(bodyParser.json());

app.get("/", function (req, res) {
    noOfKidneys = users[0].kidneys.length;
                                                        // Using FILTER Methord
    let noOfHealthyKidneys = 0;                        //let HealthyKidney = users[0].kidneys.filter(function(key) {
    for (let i = 0; i < noOfKidneys; i++) {            //   if(key.healthy == true){
        if (users[0].kidneys[i].healthy) {             //       return key;
            noOfHealthyKidneys += 1;                   //     }
        }                                              //})
    }                                                  //noOfHealthyKidneys = HealthyKidney.length

    let noOfUnhealthyKidneys = noOfKidneys - noOfHealthyKidneys;

    res.json({
        Kidneys: noOfKidneys,
        HealthyKidneys: noOfHealthyKidneys,
        Unhealthykidneys: noOfUnhealthyKidneys
    })
});

app.post("/", function (req, res) {
    let ishealthy = req.body.ishealthy;
    users[0].kidneys.push({
        healthy: ishealthy
    });

    res.json({
        msg: "done"
    });

});

app.put("/", function (req, res) {
    if(UnhealthyKidney()){
        for(let i=0;i<users[0].kidneys.length;i++)
        {
            users[0].kidneys[i].healthy = true;
        }
    
        res.json({
            msg: "Ok"
        })
    }
    else{
        res.status(411).json({
            msg: "No unhealthy kidney"
        })
    }

});

function UnhealthyKidney(){
    let unhealthyKidney = false;
    for(let i=0;i<users[0].kidneys.length;i++)
    {
        if(!users[0].kidneys[i].healthy){
            unhealthyKidney = true;
        }
    }
    return unhealthyKidney;
}

app.delete("/", function (req, res) {
    users[0].kidneys.pop();

    noOfKidneys = users[0].kidneys.length;
    res.json({
        Kidneys: noOfKidneys
    });
});

app.listen(3001);