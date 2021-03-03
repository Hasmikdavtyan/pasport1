const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const http = require('http')
const session = require('express-session')
const passport = require('./midleware/auth')
const mongoose = require('mongoose')
const checkUserSign = require('./midleware/checkUser')
const dotenv = require('dotenv');
const { activUsers} = require('./controllers/appController')
//const fileStore = require('session-file-store')(session)
const mongoStore =require('connect-mongo')(session)
dotenv.config()






const indexRouter = require('./routes/IndexRouter');
const loginRegisterRouter = require('./routes/LoginRegisterRouter');
const appRouter = require('./routes/appRouter')


const app = express();
const server = http.createServer(app)
const io = require('socket.io')(server)


//connect mongoDb

mongoose.connect(process.env.url, {useUnifiedTopology:true, 
  useNewUrlParser:true,
useCreateIndex:true,
})

const db  = mongoose.connection

db.on('connected',()=>{
  console.log('db is connected')
})
db.on('err', (err)=>{
  console.log(err)
})


io.on('connection', socket => {
  console.log('connect');
  console.log(activUsers)
  
  socket.on('message', (msg)=>{
    
    io.emit('chat-msg', {msg:msg, activUsers:activUsers})
  })
  

  socket.on('typing', (data)=>{
    socket.broadcast.emit('typing-msg', data)
  })

  io.on("disconnect", () => {
    console.log('disconnect');
  });
});

//sessionStore config
 const sessionStore = new mongoStore({
   mongooseConnection: db,
   collection: 'sessions'
 })

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(cors());
app.use(cookieParser());
app.use(session({secret:process.env.secretForSession,
store: sessionStore,
resave:false,
saveUninitialized:false,
autoRemove: 'interval',
autoRemoveInterval: 2,// In minutes. Default
cookie:{
  path:'/',
  httpOnly: true,
  maxAge: null
}}));
app.use(passport.initialize);
app.use(passport.session);



app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', loginRegisterRouter);
app.use('/app', checkUserSign,   appRouter);



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

module.exports = {app:app, server:server};

