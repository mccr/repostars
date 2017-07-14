const express = require('express');
const router  = express.Router();
const passport       = require("passport");

// Passport Routes Configuration
router.get('/login',
  passport.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/github',
  passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    //res.redirect('/repositories');
    res.redirect('/');
  });

  router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

module.exports = router;
