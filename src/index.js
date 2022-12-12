const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 3000
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());


app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
// your code goes here
function errResponder(req,res,result,operation){

    // res.status(401);
    // console.log(req);
    if(parseInt(req.body.num2) === 0 && operation === "divide"){
        res.status(400);
        return res.json({
             "status" : "error",
             "message": "Cannot divide by zero",
         })
         
     }

    // console.log(result);
    if(isNaN(result)){
        res.status(400);
        // console.log("hi feom nan");
        return res.json({
            "status" : "error",
            "message": "Invalid data types",
        })
    };

    if(result < -1000000){
        res.status(400);
        return res.json({
            "status" : "error",
            "message": "Underflow",
        })
        
    };

    if(result > 1000000){
        res.status(400);
        return res.json({
            "status" : "error",
            "message": "Overflow",
        })
        
    };
    


    return null;
};

//-----successResponse-----

function successResponse(res,result,operation){
    
    // console.log(operation);
    // res.status(200);
    switch(operation){
        case "add":
            return res.json({
                "status": "success",
                "message" : `the sum of given two numbers `,
                "sum" : `${result}`
            });
            
        case "sub":
            return res.json({
                "status": "success",
                "message" : `the difference of given two numbers `,
                "difference" : `${result}`
            });

        case "multiply":
            return res.json({
                "status": "success",
                "message" : `the product of given two numbers `,
                "result" : `${result}`
            });

        case "divide":
            return res.json({
                "status": "success",
                "message" : `the division of given two numbers `,
                "result" : `${result}`
            });
        
        default:
            return null;
    }
}

const failure = {
    "status" : "failure"
}

app.get("/",(req,res)=>{
    res.send("Hello world");
    // res.setHeader
})


app.post("/add",(req,res)=>{
    // console.log(req);
    let sum = Number(req.body.num1) + Number(req.body.num2);
    // console.log(sum);
    try{
        let error = errResponder(req,res,sum,"add");
        error ? error : successResponse(res,sum,"add");
    }catch(err){
        return res.status(500).json(failure);
    }



})

app.post("/sub",(req,res)=>{
    let difference = Number(req.body.num1) - Number(req.body.num2);

    try{
        let error = errResponder(req,res,difference,"sub");
    
        error ? error : successResponse(res,difference,"sub");
    }catch{
        
        return res.json(failure);
    }


})

app.post("/multiply",(req,res)=>{
    let result = Number(req.body.num1) * Number(req.body.num2);

    try{
        let error = errResponder(req,res,result,"multiply");
        error ? error : successResponse(res,result,"multiply");

    }catch{
        return res.json(failure);
    }


})

app.post("/divide",(req,res)=>{
    let result = Number(req.body.num1) / Number(req.body.num2);

    try{
        let error = errResponder(req,res,result,"divide");
        error ? error : successResponse(res,result,"divide");

    }catch{
        return res.json(failure);
    }


})



// make get request in post man with num1 and num 2 as  

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;