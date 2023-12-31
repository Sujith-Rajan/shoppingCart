var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var db = require("./database/connectionDb");   //db declare-------
var usersRouter = require("./routes/users");
var adminRouter = require("./routes/admin");

var hbs = require("express-handlebars");
var fileupload = require("express-fileupload");
var session = require('express-session')
var app = express();
const nocache = require('nocache');

// view engine setup

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.set('partials', true);

app.engine(
    "hbs",
    hbs.engine({
        extname: "hbs",
        defaultLayout: "layout",
        layoutsDir: path.join(__dirname, "views", "layout"),
        partialsDir: path.join(__dirname, "views", "partials"),
    })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(fileupload());
app.use(session({secret:'secretkey',cookie:{maxAge:600000}}))
app.use((req, res, next) => {
    res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
    
    next();
  });

//db connection intiliazed-----------------
db.connect((err)=>{
  if(err) {
  console.log("Conection failed"+err) ;  
  } 
  else {
  console.log("connected");
  }
})

app.use("/", usersRouter);
app.use("/admin", adminRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
