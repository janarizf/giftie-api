const createError = require('http-errors');
const express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')
var logger = require('morgan');
var cors = require("cors");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var groupsRouter = require("./routes/groups");
var listsRouter = require("./routes/lists");
var imgScraper = require("./routes/imgscraper")

var adminUserRouter = require("./routes/admin/adminuser/adminuser")
var themesRouter = require("./routes/admin/themes/themes")
var listCategoriesModel = require("./routes/admin/categories/listcategories")
var itemCategoriesModel = require("./routes/admin/categories/itemcategories")
var themesCategoriesModel = require("./routes/admin/categories/themescategories")
const mongoose = require('mongoose');

main().catch(err => console.log(err));

 async function main() {
  var mongo = await mongoose.connect('mongodb://admin:admin@ac-zde6ghn-shard-00-00.b3zn93e.mongodb.net:27017,ac-zde6ghn-shard-00-01.b3zn93e.mongodb.net:27017,ac-zde6ghn-shard-00-02.b3zn93e.mongodb.net:27017/?ssl=true&replicaSet=atlas-v7spbf-shard-0&authSource=admin&retryWrites=true&w=majority',{dbName: 'giftie'});
 console.log('connected')
  // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
  //mongodb+srv://admin:admin@giftie01.b3zn93e.mongodb.net/?retryWrites=true&w=majority
}
 

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(cors());
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
app.use(bodyParser.urlencoded({limit: '25mb', extended: true }));
app.use(express.json({limit: '25mb'}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/groups", groupsRouter);
app.use("/lists", listsRouter);
app.use("/imgscraper", imgScraper)

app.use('/admin/user',adminUserRouter)
app.use('/admin/themes',themesRouter)
app.use('/admin/category/item',itemCategoriesModel)
app.use('/admin/category/list',listCategoriesModel)
app.use('/admin/category/themes',themesCategoriesModel)




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

app.listen(process.env.PORT || 9000, () => {
  console.log('Example app listening on port 9000')
})
/* mongoose
  .connect('mongodb+srv://admin:admin@giftie01.b3zn93e.mongodb.net/giftie01?retryWrites=true&w=majority')
  .then(result => {
    app.listen(9000);
  })
  .catch(err => {
    console.log(err);
  }); */
module.exports = app;
