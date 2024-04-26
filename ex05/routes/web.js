var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) { //슬래쉬지만 등록을 /local로 했기때문에 이리로 온다.
  res.render('index', { title: '웹문서 겁색', pageName :'web/search.ejs' }); //PageName에 home.ejs를 저장 -> 타이틀에 회사소개를 저장 -> index.ejs로 이동
});

module.exports = router;
