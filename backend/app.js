const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const fs = require('fs');
const base64ToPdf = require('base64topdf');
const mysqlCon=require("./database");
const app = express();
const seedDB=require("./seedDB");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});


app.get('/', (req, res) => res.send('Hello World!!!'))

app.post("/api/posts", (req, res, next) => {
  const post = req.body;
  mysqlCon.query("INSERT INTO posts values(default,'"
        +post.statementDate+"','"
        +post.divorceDate+"','"
        +post.priorStatement+"','"
        +post.birthdate+"','"
        +post.otherBirthDate+"','"
        +post.marriageDate+"','"
        +post.separationDate+"',"
        +post.agreementExist+",'"
        +post.causeAction+"','"
        +post.custody+"','"
        +post.parentingTime+"','"
        +post.alimony+"','"
        +post.childSupport+"','"
        +post.equitableDistribution+"','"
        +post.counselFees+"','"
        +post.college+"','"
        +post.other+"','"
        +post.yourName+"','"
        +post.streetAddress+"','"
        +post.city+"','"
        +post.state+"','"
        +post.secondParty+"','"
        +post.secondAddress+"','"
        +post.secondCity+"','"
        +post.secondState+"','"
        +post.childOne+"','"
        +post.addressOne+"','"
        +post.birthOne+"','"
        +post.personOne+"','"
        +post.childTwo+"','"
        +post.addressTwo+"','"
        +post.birthTwo+"','"
        +post.personTwo+"','"
        +post.employerName+"','"
        +post.employerAddress+"','"
        +post.employerNameTwo+"','"
        +post.employerTwoAddress+"',"
        +post.insurance+","
        +post.type+","
        +post.medical+","
        +post.dental+","
        +post.prescription+","
        +post.life+","
        +post.disability+",'"
        +post.otherB+"',"
        +post.insuranceAvailable+","
        +post.sheet
        +");"
    ,(err,rows, fields)=>{
      if(err){
        res.status(501).json({
          message: 'Internal server error',
        });
      }else{
        post.Id=rows.insertId;
        res.status(201).json({
          message: 'Post added',
          post:post
        });
      }
    });


});

app.get("/api/posts", (req,res, next) => {

  mysqlCon.query("Select * from posts",(err,rows,fields)=>{
    if(err){
      console.log(err);
      return res.status(500).json({
        message: err.message
      });
    }
  return res.status(200).json({
      message: "Posts fetches successfully",
      posts:rows
    });
  });
});

app.delete("/api/posts/:id",(req,res,next)=>{
  mysqlCon.query("Delete from posts where Id="+req.params.id,(err,rows,fields)=>{
    if(err){
      res.status(500).json({
        message:err.message
      });
    }else{
      res.status(200).json({
        message:"Post Deleted"
      })
    }
  });
});
app.put("/api/posts/:id",async (req,res,next)=>{

  mysqlCon.query("Select * from posts where Id="+req.params.id,(err,rows,fields)=>{
    if(err){
      res.status(500).json({
        message:err.message
      })
    }else{
      mysqlCon.query("Update posts set "+
      "statementDate='"+rows[0].statementDate+
      "',divorceDate='"+rows[0].divorceDate+
      "',priorStatement='"+rows[0].priorStatement+
      "',birthdate='"+rows[0].birthdate+
      "',otherBirthDate='"+rows[0].otherBirthDate+
      "',marriageDate='"+rows[0].marriageDate+
      "',separationDate'"+rows[0].separationDate+
      "',agreementExist="+rows[0].agreementExist+
      ",causeAction='"+rows[0].causeAction+
      "',custody='"+rows[0].custody+
      "',parentingTime='"+rows[0].parentingTime+
      "',alimony='"+rows[0].alimony+
      "',childSupport='"+rows[0].childSupport+
      "',equitableDistribution='"+rows[0].equitableDistribution+
      "',counselFees='"+rows[0].counselFees+
      "',college'"+rows[0].college+
      "',other='"+rows[0].other+
      "',yourName='"+rows[0].yourName+
      "',streetAddress='"+rows[0].streetAddress+
      "',city='"+rows[0].city+
      "',state='"+rows[0].state+
      "',secondParty='"+rows[0].secondParty+
      "',secondAddress='"+rows[0].secondAddress+
      "',secondCity='"+rows[0].secondCity+
      "',secondState='"+rows[0].secondState+
      "',childOne='"+rows[0].childOne+
      "',addressOne='"+rows[0].addressOne+
      "',birthOne='"+rows[0].birthOne+
      "',personOne='"+rows[0].personOne+
      "',childTwo='"+rows[0].childTwo+
      "',addressTwo='"+rows[0].addressTwo+
      "',birthTwo='"+rows[0].birthTwo+
      "',personTwo='"+rows[0].personTwo+
      "',employerName='"+rows[0].employerName+
      "',employerName='"+rows[0].employerAddress+
      "',employerNameTwo='"+rows[0].employerNameTwo+
      "',employerTwoAddress='"+rows[0].employerTwoAddress+
      "',insurance="+rows[0].insurance+
      ",type="+rows[0].type+
      ",medical="+rows[0].medical+
      ",dental="+rows[0].dental+
      ",prescription="+rows[0].prescription+
      ",life="+rows[0].life+
      ",disability="+rows[0].disability+
      ",otherB='"+rows[0].otherB+
      "',insuranceAvailable="+rows[0].insuranceAvailable+
      ",sheet="+rows[0].sheet
      +" where Id="+req.params.id
      +");"
      ,(err,rows,fields)=>{
          if(err){
            res.status(500).json({
              message:err.message
            })
          }else{
            res.status(200).json({
              message:"Updated"
            })
          }
      });
    }
  });
});

// Post request Headers to Reporting Cloud Merge Endpoint
app.post('/api/print',(req,res)=>{
  let post;
  post = req.body;
  const clientServerOptions = {
    uri: 'https://api.reporting.cloud/v1/document/merge?returnFormat=PDF&templateName=Text_Control.rtf&append=true',
    body: JSON.stringify({
            "mergeData":post,
            "Template": null,
            "MergeSettings": null
    }),
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'ReportingCloud-APIKey 2PMsEcJmCKEs73Lzh5sG6Bd3KcNz9zNdL57jcA95c'
    }
  };
// Post Request
  request(clientServerOptions, function (error, response) {
    if(error){
      res.status(500).json({message:"Error Occured"});
      return;
    }
    base64ToPdf.base64Decode(response.body,"./backend/public/PDF/file"+post.Id+".pdf");
    res.status(200).json({message:"Converted to Pdf"});
  });

})
// Send pdf to printer
app.get("/api/pdf/:id",(req,res)=>{
  var file = fs.createReadStream("./backend/public/PDF/file"+req.params.id+".pdf");
  var stat = fs.statSync("./backend/public/PDF/file"+req.params.id+".pdf");
  res.setHeader('Content-Length', stat.size);
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=file'+req.params.id+'.pdf');
  file.pipe(res);
});

app.listen(3000, ()=>console.log("server running"));
