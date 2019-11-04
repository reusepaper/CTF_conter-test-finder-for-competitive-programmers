var express = require('express');
var dbConObj = require('../conf/db_info');
let secretObj = require('../conf/jwt');
var jwt = require("jsonwebtoken");
var dbconn = dbConObj.init();
var router = express.Router();
var  mysql = require('mysql');
let crypto = require('crypto');
var exec = require('child_process').exec;
/* GET users listing. */
router.post('/', function(req, res, next) {
  var userInputCode=req.body.userInputCode;
  var rightInputCode=req.body.rightInputCode;
  //var testcase=req.body.testcase;

  userInputCode = userInputCode.replace(/\n/g, "");
  userInputCode = userInputCode.replace(/\t/g, "");

  rightInputCode = rightInputCode.replace(/\n/g, "");
  rightInputCode = rightInputCode.replace(/\t/g, "");


  console.log({userInputCode:userInputCode,rightInputCode:rightInputCode});

  var child;

command = "python /home/ubuntu/project/s1p2151001/backend/mwt/mwt/main.py "
source = '"'+userInputCode+'"'; 

  child = exec(command + source,
    function (error, stdout, stderr) {
      var result = stdout
      console.log(error);
      console.log(stdout);
      console.log(stderr);
      result = JSON.parse(result);
      res.json(result);
      console.log(result);
  })
  var userResult="Hello world!";
  var rightResult="Hello world!2";
  var testcase="Hello world!!";
  
  // res.json({testcase:testcase,user:userResult,right:rightResult});

});

module.exports = router;
