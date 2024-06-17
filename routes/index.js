var express = require('express');
var router = express.Router();
var User = require('../models/users'); // ייבוא של מודל המשתמש

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Caloris Manager' });
});



module.exports = router;
