var express = require('express');
var router = express.Router();
var db = require("../db")

/* GET home page. */
router.post("/insert", function(req, res){
    const title = req.body.title;
    const price = req.body.price;
    const contents = req.body.contents;
    const isbn = req.body.isbn;
    const publisher = req.body.publisher;
    const author = req.body.authors;
    const image = req.body.thumbnail;
    
    console.log(title, price, contents, isbn, publisher, author, image)
  
    const sql = "select * from books where isbn=?";
    db.get().query(sql, [isbn], function(err, rows){
        if(!rows){
            res.send({result:1});
        }else{
            res.send({result:0});
        }
    });
});

module.exports = router;
