const WEBEX_BOT_TOKEN = require ('../package.json').WEBEX_BOT_TOKEN;
const axios = require('axios');
var express = require('express');
const https = require('https')
var router = express.Router();

router.get('/login/:email', function(req, res) {

    //[TO BE IMPLEMENTED] Connect to DB & see if user email + Country exists
    //[TO BE IMPLEMENTED] Insert to DB if user doesn't exists or else fetch
    // [TO BE IMPLEMENTED] Return DB item in result

    axios.get('https://webexapis.com/v1/people?email='+req.params.email, {
        headers: { 'Authorization': `Bearer ${WEBEX_BOT_TOKEN}`}})
  .then(response => {
    var items=response.data.items;
    if(items.length===1)
        res.json(items[0]);
    else throw new Error("User not found!");
  })
  .catch(error => {
    res.status(404).send(error);
  });


    
});

router.post('/login/:email', function(req, res) {
    //[TO BE IMPLEMENTED] Request to send deneps bot to push card

    res.status(200).send(true);
    //res.status(401).send(false);

});

module.exports = router;