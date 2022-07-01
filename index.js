const express = require('express');
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash')

//connect with mongoose
const mongoose = require('mongoose');

//connect with override
const methodOverride = require('method-override');

//require passport
const passport = require('passport');
const LocalStrategy = require('passport-local');


//connect with mongoose
const Spot = require('./models/spot');
const Review = require('./models/review');
const User = require('./models/user');

//connect with routers
const spotRoutes = require('./routes/spots');
const reviewRoutes = require('./routes/reviews');
const userRoutes = require('./routes/users');
const ExpressError = require('./utils/ExpressError');

mongoose.connect('mongodb://localhost:27017/waterSportsSpots')
    .then(() => {
        console.log('Mongo connected')
    })
    .catch(err => {
        console.log('mongo not conencted');
        console.log(err)
    })

//using EJS
app.engine('ejs', ejsMate)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//using express url encode extended to parse the body
app.use(express.urlencoded({ extended: true }))
//using method-override
app.use(methodOverride('_method'))
//serving static assets
app.use(express.static(path.join(__dirname, 'public')))
//connecting session
const sessionConfig = {
    secret: 'yannancai',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

//use session and flash middleware
app.use(session(sessionConfig))
app.use(flash())

//use passport middleware
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//add flash middleware, this must be behind passport
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

//using route handlers
app.use('/', userRoutes);
app.use('/spots', spotRoutes);
app.use('/spots/:id/reviews', reviewRoutes);

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'it went wrong!!!!!';
    res.status(statusCode).render('error', { err });
})

app.listen(3000, () => {
    console.log('app is listening')
})