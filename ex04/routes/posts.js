var express = require('express');
var router = express.Router();
var db = require('../db'); //db를 요구해서 db변수에 넣어주기

/* 게시판 목록 페이지 로 이동 */
router.get('/', function(req, res, next) { //슬래쉬지만 등록을 /posts로 했기때문에 이리로 온다.
  res.render('index.ejs', { title: '자유 게시판', pageName :'posts/list.ejs' }); //PageName에 home.ejs를 저장 -> 타이틀에 회사소개를 저장 -> index.ejs로 이동
});

//게시판 목록 데이터 불러오기 //  이작업이 뒷작업이다.
router.get('/list.json', function(req,res){ //인자로 함수를 보내줄수 있따; => 이게 콜백임 인자는 값이고 파라미터는 변수다. //
    // const sql = 'select * from posts order by pid desc'; //여기를 쪼개서 데이터포맷을 줄 수 있다. 
    const sql = 'select *, date_format(pdate, "%y-%m-%d %T") fdate from posts order by pid desc' //작따 안에 작따 들어가면 안됨.
    // const sql = 'SELECT pid, title, contents, writer, DATE_FORMAT(pdate, '%y-%m-%d - %T') AS formatted_pdate FROM posts order by pid desc';

    db.get().query(sql, function(err, rows){
        if(err){
            console.log('게시판목록 : ', err);
        }else{
            res.send(rows);
        }
    });
});

//게시판에서 글쓰기페이지로 이동 //
router.get('/insert', function(req,res){
    res.render('index.ejs', {title : '글을 쓰고 싶습니까?', pageName : 'posts/insert.ejs'})
});

//글써서 db에 저장하기 // 
router.post('/insert', function(req,res){ //이거그냥 정해져있는것.리퀘스트 요청= 요청받은 정보가 들어있다. 
    const title = req.body.title;
    const contents = req.body.contents;
    const uid = req.body.uid;
    console.log(title, contents, uid);
    const sql= "insert into posts(title,contents,writer) values(?,?,?)";
    db.get().query(sql, [title, contents, uid], function(err, rows){
        res.redirect('/posts');
    })
});

//글 읽기 페이지로 이동  이동은 get이다 무조건//
router.get('/read', function(req,res){
    const pid = req.query.pid; //
    console.log(pid);
    const sql = 'select *, date_format(pdate, "%y-%m-%d %T") fdate from posts where pid = ?'
    db.get().query(sql, [pid], function(err, rows){
        if(err){
            console.log('오류', err);
        }
        console.log(rows[0]);
        res.render('index.ejs', 
        {
            title:'글읽기', 
            pageName:'posts/read.ejs',
            post:rows[0]
        });
    })
});



module.exports = router;
