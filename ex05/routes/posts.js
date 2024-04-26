var express = require('express');
var router = express.Router();
var db = require('../db'); //db를 요구해서 db변수에 넣어주기

/* 게시판 목록 페이지 로 이동 */
router.get('/', function (req, res, next) { //슬래쉬지만 등록을 /posts로 했기때문에 이리로 온다.
    res.render('index.ejs', { title: '자유 게시판', pageName: 'posts/list.ejs' }); //PageName에 home.ejs를 저장 -> 타이틀에 회사소개를 저장 -> index.ejs로 이동
});

//게시판 목록 데이터 불러오기 //  이작업이 뒷작업이다.
router.get('/list.json', function (req, res) { //인자로 함수를 보내줄수 있따; => 이게 콜백임 인자는 값이고 파라미터는 변수다. //
    const page = req.query.page; // 프론트에서 요청한 번호를 설정하기. 
    const size = parseInt(req.query.size);
    const start = (page-1) * size;
    // const sql = 'select * from posts order by pid desc'; //여기를 쪼개서 데이터포맷을 줄 수 있다. 
    // const sql = 'select *, date_format(pdate, "%y-%m-%d %T") fdate from posts order by pid desc' //작따 안에 작따 들어가면 안됨. 이게 기본이다.
    // const sql = 'SELECT pid, title, contents, writer, DATE_FORMAT(pdate, '%y-%m-%d - %T') AS formatted_pdate FROM posts order by pid desc';
    let sql = 'select *, date_format(pdate, "%y-%m-%d %T") fdate from posts order by pid desc limit ?, ?'; //이건 페이지 번호만들기 이거근데 const로 이어서작성은 안된다. 물음표 = 변수
    db.get().query(sql, [start, size], function (err, rows) { //물음표2개니까 배열로 해야지 ㅎㅎㅎㅎㅎ
        // if (err) {
        //     console.log('게시판목록 : ', err);
        // } else {
        //     res.send(rows);
        // }
        const documents = rows; //목록이  documents로 들어가는거임.
        sql = "select count(*) su from posts";
        db.get().query(sql, function(err, rows){
            if(err){
                console.log("카운트 정보 불러오기 오류")
            }
            const su = rows[0].su; // 1행의 su값을 su에 들어있는거임
            res.send({documents, su}); //documets 안에 배열, su안에 su를 넣은거임.
        });
    });
});

//게시판에서 글쓰기페이지로 이동 //
router.get('/insert', function (req, res) {
    res.render('index.ejs', { title: '글을 쓰고 싶습니까?', pageName: 'posts/insert.ejs' })
});

//글써서 db에 저장하기 // 
router.post('/insert', function (req, res) { //이거그냥 정해져있는것.리퀘스트 요청= 요청받은 정보가 들어있다. 
    const title = req.body.title;
    const contents = req.body.contents;
    const uid = req.body.uid;
    console.log(title, contents, uid);
    const sql = "insert into posts(title,contents,writer) values(?,?,?)";
    db.get().query(sql, [title, contents, uid], function (err, rows) {
        res.redirect('/posts');
    })
});

//글 읽기 페이지로 이동  이동은 get이다 무조건//
router.get('/read', function (req, res) {
    const pid = req.query.pid; //get일때는 쿼리에 들어있음. 
    console.log(pid);
    const sql = 'select *, date_format(pdate, "%y-%m-%d %T") fdate from posts where pid = ?'
    db.get().query(sql, [pid], function (err, rows) {
        if (err) {
            console.log('오류', err);
        }
        console.log(rows[0]);
        res.render('index.ejs',
            {
                title: '글읽기',
                pageName: 'posts/read.ejs',
                post: rows[0]
            });
    })
});

//글을 삭제해보기  앞에 posts가 생략되있음
router.get('/delete', function (req, res) { //콜백함수임. 인자를 보내주는 함수이름 = 콜백함수 
    const pid = req.query.pid;
    console.log(".................", pid);
    const sql = "delete from posts where pid=?" // 물음표가 여러개일수 있으니 밑에 배열이된다.
    db.get().query(sql, [pid], function (err, rows) {
        if (err) {
            console.log("삭제에서 오류났다!!비상!!!", err);
        }
        res.redirect("/posts");
    })
});

//수정을 누르면 posts의 update로 오라했으니 여기다가 만들겠다.  그리고 수정페이지 이동하게 하겠다. 
router.get('/update', function (req, res) { //여기는 path이름이다. 어디로갔을 뭐하겠다...
    const pid = req.query.pid; //여기위의 pid는 pid넘긴 변수명이다.
    const sql = "select * from posts where pid=?";
    db.get().query(sql, [pid], function (err, rows) { //db.get을 실행하는데 쿼리문으로 근데 물음표가있으니까 물음표에 해당하는거 넣어주고 결과가 에러가난경우, 결과값이 제대로 난경우 나눠주기
        if (err) {
            console.log("업데이트에서 오류났다!! 비상 !!!", err)
        }
        const post = rows[0];
        res.render('index.ejs', {
            title: '수정하기', pageName: "posts/update.ejs", post: post
        });
    });
});

//이제 수정을 진짜로 하자.
router.post('/update', function (req, res) {
    const pid = req.body.pid; //여기는 name으로 들어오니까 update.ejs에서 네임을 지정안해주면 못가져오는거임.
    const title = req.body.title;
    const contents = req.body.contents;
    console.log(pid, title, contents);
    const sql = "update posts set title=?, contents=?, pdate=now() where pid=?";
    db.get().query(sql, [title, contents, pid], function (err, rows) {
        if(err){
            console.log("비상!!! 수정하다가 오류이따!", err);
        }
        res.redirect("/posts");
    });
});
module.exports = router;
