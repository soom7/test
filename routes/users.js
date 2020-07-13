var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/hoho', function(req, res, next) {
  res.send('ㅎㅎㅎ');
});

router.get('/koko', function(req, res, next) {
  res.json({status:200, msg:'성공'});
});

router.get('/giveme', function(req, res, next) {
  let number = Math.random();
  res.json({status: number, msg:'성공'});
});

module.exports = router;
