const mysqlCon = require("./database");

const post= {
        id:1,
      statementDate: "07/08/1990",
      divorceDate: "12/08/1995",
      priorStatement: "12/10/2015",
      birthdate: "07/08/1990",
      otherBirthDate: "07/08/1990",
      marriageDate: "07/08/1990",
      separationDate: "07/08/1990",
      agreementExist:false,
       causeAction: "stinky farts",
       custody: "Hers",
       parentingTime: "fifty fifty",
       alimony: "$100000 per month",
       childSupport: "$20 per month",
       equitableDistribution: "string",
       counselFees: "I dont have a lawyer",
       college: "1000000",
       other: "not sure",
       yourName: "Jeff Bezoz",
       streetAddress: "7619 Baby Bottom",
       city: "Jersey City",
       state: "New Jersey",
       secondParty: "Beyonce",
       secondAddress: "Bevery Hills",
       secondCity: "Los Angeles",
       secondState: "California",
       childOne: "baby",
       addressOne: "7619 Spring Morning",
       birthOne: "07/08/1990",
       personOne: "Ducks",
       childTwo: "Bobby",
       addressTwo: "7619 Spring Morning Dr.",
       birthTwo: "07/08/1990",
       personTwo: "Adrian",
       employerName:"Leap",
       employerAddress:"Address",
       employerNameTwo:"baby",
       employerTwoAddress:"123 Fake st",
       insurance:true,
	      type :false,
        medical :false,
        dental :false,
        prescription :false,
        life :false,
        disability :false,
        otherB:"",
        insuranceAvailable :false,
        sheet :false
      };
function seedDB(){
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
    )
}

module.exports=seedDB;
