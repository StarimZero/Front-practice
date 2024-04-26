var express = require('express');
var router = express.Router();

/* 도서검색 */
router.get('/', function(req, res, next) {
  res.render('index.ejs', { title: '도서검색', pageName : 'book/search.ejs'}); //페이지네임은 ~ 타이틀은 ~ -> 가지고 인덱스ejs로간다.
});

module.exports = router;
