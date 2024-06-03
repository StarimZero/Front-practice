var express = require('express');
var router = express.Router();
var db = require("../db")


//주문자정보 등록
router.post('/purchase', function(req, res){
    const pid=req.body.pid;
    const uid=req.body.uid;
    const uname=req.body.uname;
    const phone=req.body.phone;
    const add1=req.body.add1;
    const add2=req.body.add2;
    const sum=req.body.sum;
    let sql="insert into purchase(pid,uid,uname,phone,add1,add2,sum)";
    sql+=" values(?,?,?,?,?,?,?)";
    db.get().query(sql,[pid,uid,uname,phone,add1,add2,sum], function(err, rows){
      if(err){
        res.send({result:0});
      }else{
        res.send({result:1});
      }
    });
  })

//주문상품입력
router.post("/insert", function(req,res){
    const pid = req.body.pid;
    const bid = req.body.bid;
    const price = req.body.price;
    const qnt = req.body.qnt;
    const sql = "insert into orders(pid,bid,price,qnt) values(?,?,?,?)";
    db.get().query(sql, [pid,bid,price,qnt], function(err, rows){
        if(err){
            console.log("err>...............................", err)
            res.send({result:0})
        }else{
            res.send({result:1})
        }
    });
});







module.exports = router;
