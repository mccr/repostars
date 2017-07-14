const passport       = require("passport");
const path         = require('path');
const debug = require('debug')(`repostars:${path.basename(__filename).split('.')[0]}`);


passport.serializeUser(function(user, cb) { cb(null, user); });
passport.deserializeUser(function(obj, cb) { cb(null, obj);  });

require('./github');
