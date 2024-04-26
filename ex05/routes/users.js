var express = require('express');
var router = express.Router();
var db = require('../db'); //db를 요구해서 db변수에 넣어주기


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* 로그인*/
router.get('/login', function(req, res, next) { //주소창에 직접치면 get이니까 이리로온다. 
  res.render('index.ejs', { title: '로그인', pageName :'users/login.ejs' }); //PageName에 home.ejs를 저장 -> 타이틀에 회사소개를 저장 -> index.ejs로 이동
});

/* 로그인 체크*/ //여기는 백엔드 페이지다 .// 
router.post('/login', function(req, res){ // /login 이지만 여기는 post라서 로그인과 체크를 따로 구분안해도 알아서 구분한다. 
  const uid = req.body.uid; //submit하면 body에저장된다. ejs에서 받은 uid를 가져오는거 -> req = 요청 ; post의 데이터보내기는 body에 들어있다. => 요청한다 바디에있는데이터를 uid에 있는을 uid변수에 저장
  const upass = req.body.upass;
  console.log(uid, upass); //여기는 백엔드페이지니까 터미널에 찍힌다. 
  const sql = "select * from users where uid=?"; // uid와 upass를 불러왔으니 database에서 찾아보자. 
  db.get().query(sql, [uid], function(err, rows){ //db에 있는 get함수를 실행할거다.  근데 db를 쓸거면 있어야 쓰지. -> 그래서 db변수를 정의해줬다.  함수실행하면 커넥션이 리턴됨.
	//쿼리 실행하는데 위에 sql 정의한걸, uid, // 쿼리실행후 인자1(err)실행, 인자 2실행 // 나는 err를 정의안해서 실행안함 
	// if(err){
	// 	console.log('에러', err);
	// 	ruturn;
	// } //할거면 이렇게 해주면된다. 
	console.log(rows[0]); //한개니까 제일 처음에 나올것 = 인덱스 번호 0번  (json은 중괄호안에 값:키) rows로 만 찍으면 배열로 찍힌다. 첫번쨰꺼는 중괄호 하나만 찍히겠지.
	let result = 0; //0번은 셀렉트해서 온 결과가 들어있는거
	if(rows[0]){
		if(rows[0].upass == upass){
			result = 1; //만약 upass들이 일치하면 값을 1로 지정
		}else{
			result = 2; //틀리면 값을 2로 지정
		}
	} //0이면 없는거, 1이면 일치하는거, 2면 불일치하는거 로그인할때의 if문의 정석 
	res.send({result}); //res=응답 응답해준다.보낸다(리절트값을(0,1,2)) 원래는 result(key):(result(값(0,1,2)))인데, 변수같으니까 하나만쓴다. 
	//암튼 다 하면 ejs에 있는 success함수에다가 data로 보낸다. ejs에서 값에 대한 정의를 해주면된다(0일때 ~ 1일때 ~ 2일때 )
  });
});





module.exports = router;
