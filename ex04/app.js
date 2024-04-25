var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index'); //indexrouter는 라우티스의 인덱스다.
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter); // users 가 들어오면 usersrouter를 해라
app.use('/book', require('./routes/book')); // 라우터를 등록한거임
app.use('/local', require('./routes/local'));
app.use('/blog', require('./routes/blog'));
app.use('/image', require('./routes/image'));
app.use('/web', require('./routes/web'));
app.use('/posts', require('./routes/posts')); //posts라우터는 /posts로 시작하게될것.


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

let db = require('./db'); //db.js를 요구해서 db변수에 저장하고 
db.connect(); //db를 커넥스함수를 실행한거임.

module.exports = app;
