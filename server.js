const mysql = require('mysql');
const http = require('http');
const express=require('express');
const hostname='localhost';
const port=3000;
const app=express();

fs = require('fs');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "Lab1"
});

const getDbData=(con)=>{
    return new Promise((resolve,reject)=>{
        con.query('SELECT * FROM lab1.measurement;',(err,res)=>{
            if (err)
                reject(err);
            else
                resolve(res);
        });
    });
};

function sendMeasureAsJSON(con,result)
{
    getDbData(con).then((res,err)=>
    {
        result.json(res);
    }).catch((err)=> {
        console.log("Failed error!",err);
        result.send(400);
    });
}

app.use(express.static('dist'));


app.get('/measurments',(req,res)=>{
    sendMeasureAsJSON(con,res);
});

app.listen(port,()=> console.log("App is working at port"+port));



// Console will print the message
console.log('Server running at http://127.0.0.1:3000/');