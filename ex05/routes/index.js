var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '회사소개', pageName :'home.ejs' }); //PageName에 home.ejs를 저장 -> 타이틀에 회사소개를 저장 -> index.ejs로 이동
});



module.exports = router;
