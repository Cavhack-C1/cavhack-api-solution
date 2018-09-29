var express = require('express');
var router = express.Router();
var Profile = require('../models').profile
//var Profile = require('../mock/profile')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.sendStatus(200)
});

 /* GET all profiles in the database */
router.get('/profiles', function (req, res, next) {
  Profile.findAll()
  .then((profiles) => {
    res.json(profiles)
  })
})

 /* GET a profile based off an id */
router.get('/profiles/:id', function (req, res, next) {
  Profile.findById(req.params.id)
  .then((profile) => {
    res.json(profile)
  })
})

 /* CREATE a new profile */
router.post('/profiles', function (req, res) {
  Profile.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    bio: req.body.bio,
    interests: req.body.interests,
    skills: req.body.skills
  })
  .then((profile) => {
    res.json(profile)
  })
})

 /* UPDATE a profile based off an id */
router.put('/profiles/:id', function(req, res) {
 Profile.findById(req.params.id)
 .then((profile) => {
   if(profile) {
     profile.updateAttributes(req.body)
   }
   res.json(profile)
 })
})

/* DELETE a profile based off an id */
router.delete('/profiles/:id', function(req, res) {
  Profile.findById(req.params.id)
  .then((profile) => {
    if(profile) {
      profile.destroy()
    }
    res.send("Profile destroyed")
  })
})

/* GET all interests based off profile id */
router.get('/interests/:id', function(req, res) {
  Profile.findById(req.params.id)
 .then((profile) => {
   res.json(profile.interests)
 })
})

/*** BACKUP CODE  ***/

/* GET a 200 response from the home page */
// router.get('/', function (req, res) {
//   res.sendStatus(200)
// });

// /* GET all profiles in the database */
// router.get('/profiles', function (req, res) {
//   res.send(Profile.findAll())
// })

// /* CREATE a new profile */
// router.post('/profiles', function (req, res) {
//   var profiles = Profile.create({
//     firstName: req.body.firstName,
//     lastName: req.body.lastName,
//     bio: req.body.bio,
//     interests: req.body.interests,
//     skills: req.body.skills
//   })
//   res.send(profiles)
// })

// /* GET a profile based off an id */
// router.get('/profiles/:id', function (req, res) {
//   var profile = Profile.findById(req.params.id)
//   res.send(profile)
// })

// /* UPDATE a profile based off an id */
// router.put('/profiles/:id', function(req, res) {
//   var profile = Profile.update(req.params.id, {
//     firstName: req.body.firstName,
//     lastName: req.body.lastName,
//     bio: req.body.bio,
//     interests: req.body.interests,
//     skills: req.body.skills
//   })
//   res.send(profile)
// })

// /* DELETE a profile based off an id */
// router.delete('/profiles/:id', function(req, res) {
//   var profiles = Profile.remove(req.params.id)
//   res.send(profiles)
// })

// /* GET all interests based off a profile id */
// router.get('/profiles/:id', function (req, res) {
//   var profile = Profile.findById(req.params.id)
//   res.send(profile.interests)
// })




module.exports = router;
