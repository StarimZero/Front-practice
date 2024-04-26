let mysql = require('mysql'); //마에큐를 요구해서 mysql에 저장해놓은거임.
let config = {
    connectionLimit : 100, //최대 몇개까지 할건지
    host : 'localhost', //mysql의 hostname이나 local이나 내ip // localhost자체는 127.0.0.1이다.
    user : 'node',
    password : 'pass',
    database : 'nodedb', //오라클은 유저만들어서 권한주고 테이블만들기, 마에큐는 DB를 만들고 그 데이터베이스에 유저권한을 줘서 쓰기떄문에 데이터베이스 이름이 있다. 
    port : '3306' //마에큐 포트이다.
}

let pool = mysql.createPool(config); // 풀에 커넥션 개체를 넣어주고 같이 꺼내서 쓸수있다.(100명만 쓸순 없으니까)
let connection;
exports.connect = function(){ //exports했기때문에 다른곳에서 쓸수 있다.
    pool.getConnection(function(err, con){ //풀에있는 커넥션을 겟해올건데... err뜨면 오류뜨고 아니면 접속하고, 접속성공이라고 띄우기 
        if(err){
            console.log('DB접속 오류 : ', err);
        }else{
            connection = con;
            console.log('접속 성공');
        }
    });
} // 접속자체를 계속할필요없으니까 한번만해주면된다 -> 그러니까 어플리케이션 처음실행시 실행되는 app.js에서 함수를 실행해주자. 

exports.get = function(){ //가져올때 쓰는거임. 로그인처리, 체크를 우리는 index.js에서 해줬다. -> 근데 인덱스에 넣어놓으면 그림안좋으니 users로 이동하자 라우터 자체는 백엔드이다.
    return connection;
}