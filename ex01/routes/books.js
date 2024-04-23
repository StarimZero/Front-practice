var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.ejs', { title: '도서검색', pageName:"books.ejs" }); /* /books일때 인덱스로 가기로 하는데, 출력이 페이지네임이 books.ejs인것*/
});

module.exports = router;
