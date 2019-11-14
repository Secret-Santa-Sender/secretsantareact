
const db = require('../models')
const router = require("express").Router()
const passport = require('../passport')

//Route for logging out a user
router.post('/login', passport.authenticate('local'), function(req, res) {
	res.send({user: req.user})
	console.log("logged in")
});

// Route for signing up a user. 
router.post('/signup', (req, res) => {
    console.log('user signup');

    const { email, password } = req.body

    db.Participant.create({email: email, password: password})
      .then(dbParticipant => res.json(dbParticipant))
      .catch(err => res.status(422).json(err));

})


router.get('/checkforsession', (req, res) => {
	console.log("checking for session...")
	console.log("req.user", req.user)
	
	if (req.user) {
		res.json({ user: req.user })
	}
	else {
		res.json({user: null})
	}	
})


// Route for logging user out
router.get('/logout', (req, res) => {
req.logout()
res.send({redirectTo: '/'})
})


// Route for client to check if there's still a live server session, also sends data back about the user.
// router.get('/session', isAuthenticated, (req, res) => {
// const { username, _id } = req.user

// res.json({ user: { username, _id }})
// })

module.exports = router