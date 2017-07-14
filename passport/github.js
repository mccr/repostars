const passport       = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const path         = require('path');
const debug = require('debug')(`repostars:${path.basename(__filename).split('.')[0]}`);
const User = require('../models/User');



passport.use(new GitHubStrategy({
    clientID:     process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/github"
  },
  (accessToken, refreshToken, profile, done) => {
    debug('we have the profile');


    let newUser = {
      token: accessToken,
      githubId: profile._json.id || '',
      name: profile._json.name || '',
      username: profile._json.login || '',
      email: profile._json.email || '',
      avatar: profile._json.avatar_url || ''
    };

    console.log(newUser);

    User.findOne({githubId: newUser.githubId})
        .then(user => {
          if(!user) return new User (newUser).save();
          return User.findByIdAndUpdate(user._id, newUser, {new: true});
        })
        .then(user => done(null, user))
        .catch( e => done(e));
  }
));
