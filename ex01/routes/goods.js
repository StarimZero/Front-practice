var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) { // 슬래쉬는 /goods가 된거임 app에서 해줬으니까 
  res.render('index.ejs', { title: '상품검색', pageName : "goods.ejs" }); //주소가 /일때 render안에 있는 ejs를 출력해라 (생략가능)
});

module.exports = router;
