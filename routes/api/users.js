const router = require('express').Router();
let User = require('../../models/user.model');
let Note = require('../../models/note.model');

const bcrypt = require('bcrypt');
const saltRounds = 10;


// Get all users
router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json("Error: " + err));
});

// Get user by username
router.route('/username/:username').get((req, res) => {
    const username = req.params.username;

    User.findOne({username})
        .then(user => res.json(user))
        .catch(err => res.status(400).json("Error: " + err));
});

// Get user by email
router.route('/email/:email').get((req, res) => {
    const email = req.params.email;

    User.findOne({email})
        .then(user => res.json(user))
        .catch(err => res.status(400).json("Error: " + err));
});

// Get notes from user
router.route('/user/:username/notes').get((req, res) => {
    const username = req.params.username;

    Note.find({username})
        .then(notes => res.json(notes))
        .catch(err => res.status(400).json("Error: " + err));

});

// Create new user
router.route('/').post((req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    bcrypt.hash(password, saltRounds, (err, hash) => {

        if(err) {
            console.log(err);
        } else {
            // Store hash in your password DB.
            const newUser = new User({username, email, password : hash});
            newUser.save()
                .then(() => {
                    res.status(200).json("User added!");
                })
                .catch(err => res.status(400).json("Error: " + err));

        }

    });

});

// Delete user (by id)
router.route('/:id').delete((req, res) => {
    const id = req.params.id;

    User.findByIdAndDelete(id)
        .then(user => res.json("User deleted: " + user.username))
        .catch(err => res.status(400).json("Error: " + err));
});

// User Log In
router.route('/login').post( (req, res) => {
    // Log In user and redirect to root ('/')
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({username})
        .then(user => {
            const hash = user.password;
            bcrypt.compare(password, hash, function(err, result) {
                // result == true
                if(!result) {
                    res.status(401).json("Authentication error: " + err);
                } else {
                    res.send(user);
                }
            });
            
        })
        .catch(err => res.status(400).json("Error: " + err));
});


module.exports = router;