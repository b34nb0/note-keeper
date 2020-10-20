const router = require('express').Router();
let Note = require('../../models/note.model');

// Get all notes
router.route('/').get((req, res) => {
    Note.find()
        .then(notes => res.json(notes))
        .catch(err => res.status(400).json("Error: " + err));
});

// Get note (by id)
router.route('/:id').get((req, res) => {
    const id = req.params.id;
    Note.findById(id)
        .then(note => res.json(note))
        .catch(err => res.status(400).json("Error: " + err));
});

// Create new note
router.route('/').post((req, res) => {
    const username = req.body.username;
    const title = req.body.title;
    const content = req.body.content;
    const newNote = new Note({username, title, content});

    newNote.save()
        .then(() => res.json("Note added!"))
        .catch(err => res.status(400).json("Error: " + err));
});

// Update note (by id)
router.route('/:id').put((req, res) => {
    const id = req.params.id;
    const username = req.body.username;
    const title = req.body.title;
    const content = req.body.content;

    Note.updateOne({_id : id}, {username, title, content})
        .then(docs => res.json(`${docs.nModified} note(s) updated!`))
        .catch(err => res.status(400).json("Error: " + err));

});

// Delete note (by id)
router.route('/:id').delete((req, res) => {
    const id = req.params.id;

    Note.findByIdAndDelete(id)
        .then(note => res.json("Note deleted: " + note.title))
        .catch(err => res.status(400).json("Error" + err));

});


module.exports = router;