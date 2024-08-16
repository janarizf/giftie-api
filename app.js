var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var userSettingsRouter = require("./routes/userSettings");
//var groupsRouter = require("./routes/groups");
var listsRouter = require("./routes/lists");
var itemsRouter = require("./routes/items")

var adminUserRouter = require("./routes/admin/adminuser/adminuser")
var themesRouter = require("./routes/admin/themes/themes")
var listCategoriesRouter = require("./routes/admin/categories/listcategories")
var itemCategoriesRouter = require("./routes/admin/categories/itemcategories")
var themesCategoriesRouter = require("./routes/admin/categories/themescategories")
var subscriptionlistRouter = require("./routes/subscriptionList")


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/userssettings', userSettingsRouter);
app.use('/subscriptionlist', subscriptionlistRouter);


//app.use("/groups", groupsRouter);
app.use("/lists", listsRouter);
app.use("/items", itemsRouter);

app.use('/admin/user', adminUserRouter)
app.use('/admin/themes', themesRouter)
app.use('/admin/category/item', itemCategoriesRouter)
app.use('/admin/category/list', listCategoriesRouter)
app.use('/admin/category/themes', themesCategoriesRouter)
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  var mongo = await mongoose.connect('mongodb://admin:admin@ac-zde6ghn-shard-00-00.b3zn93e.mongodb.net:27017,ac-zde6ghn-shard-00-01.b3zn93e.mongodb.net:27017,ac-zde6ghn-shard-00-02.b3zn93e.mongodb.net:27017/?ssl=true&replicaSet=atlas-v7spbf-shard-0&authSource=admin&retryWrites=true&w=majority', { dbName: 'giftiedb' });
  console.log('connected')
  // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
  //mongodb+srv://admin:admin@giftie01.b3zn93e.mongodb.net/?retryWrites=true&w=majority
}

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
  console.log('Giftie Backend running')
})


//npx express-generator myExpressApp --view ejs
module.exports = app;
