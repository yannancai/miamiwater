const User = require('../models/user');

//get the register form
module.exports.renderRegister = (req, res) => {
    res.render('users/register');
}

//add new user to Users db
module.exports.register = async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'welcome to MiamiAqua Spot!');
            res.redirect('/spots');
        })
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('register');
    }
}

//get the login form
module.exports.renderLogin = (req, res) => {
    res.render('users/login')
}

//render the user page
module.exports.login = (req, res) => {
    req.flash('success', 'welcome back!');
    //redirect to the previous url before login page
    const redirectUrl = req.session.returnTo || '/spots';
    delete req.session.returnTo
    res.redirect(redirectUrl);
}

//logout user
module.exports.logout = (req, res) => {
    req.logout();
    req.flash('success', "Goodbye!");
    res.redirect('/spots');
}