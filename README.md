# CavHack API Solution
This code-a-long will be helping you create your own api to grab profiles from a database. By the end you will be able to **Create** profiles, **Read** profiles **Update** profiles and **Delete** profiles.

## Table of Contents
- [Installation](#installation)
- [Writing Routes](#writing-routes)

## Installation
Before we can dive into the development, you'll need to set up a few things:

* Open up GitBash from computer apps

retrieve our starter code folder with `git clone` command
```bash
git clone https://github.com/Cavhack-C1/cavhack-api
```
go into our starter code folder `cd` command
```bash
cd cavhack-api
```

* Open up VS Code from program files
* Within VS Code open `cavhack-api` folder
*  Open the file `/config/config.json`
* Under development, change the password to `password`
* Go back to Git Bash and copy and paste these commands to set up the database we have prepared for you

```bash
createdb cavhacks
sequelize db:migrate
sequelize db:seed:all
```
* If you are having problems with these then do the following to work with our mock database:
  * Comment out the line `var Profile = require('../models')` 
  * Uncomment out the line `var Profile = require('../mock/profile')`


* In Git Bash write `npm start` to start the server
* In Chrome type in the search bar

```
http://localhost:8080/
```

* You should see `OK` displayed in the browser. This means your server is running correctly!

## Writing Routes
* Open to `/routes/controller.js` file
* You should see: 
```js
router.get('/', function (req, res, next) {
  res.sendStatus(200)
});
```
* Change that block of text to the following:
```js
router.get('/', function (req, res, next) {
  res.send('hello world')
});
```
* `Ctrl + C` in Git bash and run `npm start` again
* You should see `Hello World` in your browser when you refresh the page

#### Get All Profiles
With database
```js
router.get('/profiles', function (req, res, next) {
  Profile.findAll()
  .then((profiles) => {
    res.json(profiles)
  })
})
```
Without database
```js
router.get('/profiles', function (req, res) {
  res.send(Profile.findAll())
})
```

#### Get a Profile by Id
With database
```js
router.get('/profiles/:id', function (req, res, next) {
  Profile.findById(req.params.id)
  .then((profile) => {
    res.json(profile)
  })
})
```
Without database
```js
router.get('/profiles/:id', function (req, res) {
  var profile = Profile.findById(req.params.id)
  res.send(profile)
})
```

#### Adding a New Profile
With database
```js
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
```
Without database
```js
router.post('/profiles', function (req, res) {
  var profiles = Profile.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    bio: req.body.bio,
    interests: req.body.interests,
    skills: req.body.skills
  })
  res.send(profiles)
})
```

#### Updating a Profile
With database
```js
router.put('/profiles/:id', function(req, res) {
 Profile.findById(req.params.id)
 .then((profile) => {
   if(profile) {
     profile.updateAttributes(req.body)
   }
   res.json(profile)
 })
```
Without database
```js
router.put('/profiles/:id', function(req, res) {
  var profile = Profile.update(req.params.id, {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    bio: req.body.bio,
    interests: req.body.interests,
    skills: req.body.skills
  })
  res.send(profile)
})
```

#### Deleting a Profile
With database
```js
router.delete('/profiles/:id', function(req, res) {
  Profile.findById(req.params.id)
  .then((profile) => {
    if(profile) {
      profile.destroy()
    }
    res.send("Profile destroyed")
  })
})
```
Without database
```js
router.delete('/profiles/:id', function(req, res) {
  var profiles = Profile.remove(req.params.id)
  res.send(profiles)
})
```

#### Getting all interests based on ID
* You can access the interests from a profile with `profile.interests`
* Follow the steps to **Get a Profile by ID** but instead of returning `profile` in `res.json`, send `profile.interests`

#### CRUD for Interests and Other Parts of the Profiles
See if you can follow the steps above to make a **POST**, **PUT** and **DELETE** requests for either all the interests for a particular ID or one of the other fields in the profile.
