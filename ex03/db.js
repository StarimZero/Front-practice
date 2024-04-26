let mysql = require('mysql');
let config = {
    connectionLimit : 100, //최대 몇개까지 할건지
    host : 'localhost', //mysql의 hostname이나 local이나 내ip\
    user : 'node',
    password : 'pass',
    database : 'nodedb',
    port : '3306'
}

let pool = mysql.createPool(config);
let connection;
exports.connect = function(){
    pool.getConnection(function(err, con){
        if(err){
            console.log('DB접속 오류 : ', err);
        }else{
            connection = con;
            console.log('접속 성공');
        }
    });
}

exports.get = function(){
    return connection;
}