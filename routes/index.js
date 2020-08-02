var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('page2', { title: 'Express' });
});

router.get('/review', function(req, res, next) {
  res.render('review', { title: 'Express' });
});

router.get('/join', function(req, res, next) {
  res.render('join', { title: 'Express' });
});


module.exports = router;

