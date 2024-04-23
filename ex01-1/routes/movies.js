var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) { // 슬래쉬는 /moves가 된ㄴ거임 app에서 해줬으니까 
  res.render('index.ejs', { title: '영화검색', pageName : "movies.ejs"  });
});

module.exports = router;
