var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/user', function(req, res, next) {
  res.render("Reached a user");
  res.send('respond with a resource');
});

module.exports = router;
