var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '회사소개', pageName :'home.ejs' }); //PageName에 home.ejs를 저장 -> 타이틀에 회사소개를 저장 -> index.ejs로 이동
});

/* 로그인*/
router.get('/login', function(req, res, next) {
  res.render('index.ejs', { title: '로그인', pageName :'users/login.ejs' }); //PageName에 home.ejs를 저장 -> 타이틀에 회사소개를 저장 -> index.ejs로 이동
});

/* 로그인 체크*/
router.post('/login', function(req, res){
  const uid = req.body.uid; //submit하면 body에저장된다.
  const upass = req.body.upass;
  console.log(uid, upass);
  const sql = "select * from users where uid=?";
  db.get().query(sql, [uid], function(err, rows){
	console.log(rows[0]);
	let result = 0;
	if(rows[0]){
		if(rows[0].upass == upass){
			result = 1;
		}else{
			result = 2;
		}
	}
	res.send({result});
  });
});

module.exports = router;
