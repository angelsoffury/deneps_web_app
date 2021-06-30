
const axios = require('axios');
const express = require('express');
const https = require('https')
const moment = require('moment');
const router = express.Router();
const WEBEX_BOT_TOKEN = require('../package.json').WEBEX_BOT_TOKEN
const createAdaptiveCard=require('./webexCard');
var db=require('./db')


router.post('/isValidUser',function(req,res){
  var user={};
  axios.get('https://webexapis.com/v1/people?email='+req.body.useremail, {
    headers: { 'Authorization': `Bearer ${WEBEX_BOT_TOKEN}`}})
  .then(response => {
    var items=response.data.items;
    if(items.length===1){ 
      var item=items[0];
      user.success=true;
      user.useremail=req.session.useremail=item.emails[0];
      user.firstname=req.session.firstname=item.firstName;
      user.lastname=req.session.lastname=item.lastName;
      res.json(user);
    }
    else {
      throw new Error("User not found!");
    }
  })
  .catch(error => {
    console.log("Im in catch of is valid user",error);
    res.status(404).json({
      msg: error.message,
      success: false
    });
  });
});

router.post('/loginCardAuth', function(req,res){
  let body= createAdaptiveCard(req.body.useremail, req.body.usercountry);
  axios.post("https://webexapis.com/v1/messages",body, {
    headers: { 'Authorization': `Bearer ${WEBEX_BOT_TOKEN}`}
  })
  // .then(response=>{

  //   body={
  //     "text":"DENEPS Login Request expired!"
  //   }
  // setTimeout(() => { }, 10000);
  //  axios.put("https://webexapis.com/v1/messages/"+response.id,body,{
  //     headers: { 'Authorization': `Bearer ${WEBEX_BOT_TOKEN}`}})
  // })

  req.session.dualauth=true;
  res.json({
    success: true
  })

});

router.post('/login', function(req, res) {
var dbuser=[];
try{
  if (!req.session.dualauth) throw new Error("User not authenticated!");
  /*db.getConnection(function(err,conn){
    if(err) throw new Error ("DB connection error");
      // [[TO BE IMPLEMENTED]] add country filter
    conn.query("SELECT * FROM user WHERE useremail = '"+req.body.useremail+"'", function(err, results, fields){
    if(err) throw new Error ("User invalid in DB");
      dbuser=results;
    });
    if(dbuser.length===0){
      //User loggin in for the first time 
      // [TO BE IMPLEMENTED] Create user into DB
    }
      
    //TO BE IMPLEMENTED] Add login transaction 
    // res.json({
    //   success:true
    // })
    conn.release();
  }); 
  */
 res.json({
  success: true
 });

}catch(error){
  console.log(error.message);
  res.status(404).json({
    msg: error.message,
    success: false
  });
}

});

router.post('/isLoggedIn',function(req,res){

if(req.session.dualauth)
{
  let data = {};
  data.success=true;
  data.useremail=req.session.useremail;
  data.firstname=req.session.firstname;
  data.lastname=req.session.lastname;
  console.log(data);
  res.json(data);
}
else{
  data={
    msg:'No User Session',
    success: false
  };
  res.status(404).json(data);
}
});

router.post('/logout', function(req, res) {

    req.session.destroy(function(err) {
      if(err) {
        res.status(404).json({
          msg:'Cannot Logout User Session',
          success: false
        });
        console.log(err);
      } else {
        res.json({
          success: true
        });
      }
    });
});

module.exports = router;
