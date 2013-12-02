var express = require('express'),
    http = require('http'),
    fs = require('fs'),
    passport = require('passport'),
    routes = require('./routes').routes;

var app = express();
app.use(express.logger());
app.use(express.compress());
app.use(express.bodyParser());


passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
app.use(express.methodOverride());
app.use(express.cookieParser());

app.use(express.session({
  secret : 'almvnirtgd#$DFsa25452*AYD*D*S!@!#adsda))Ddsadsax',
  cookie: {httpOnly: true, secure: false, maxAge: 86400000},
  store: new express.session.MemoryStore()
}));

app.use(passport.initialize());
app.use(passport.session());




routes(app, JSON.parse(fs.readFileSync('initial_data.json')));

app.use('/', express.static(__dirname + '/app'));

var port = process.env.PORT || 8000;
app.listen(port);
console.log('Please go to http://localhost:' + port);

