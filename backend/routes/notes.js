const express = require('express');
const router = express.Router();
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');
const fetchuser = require("../middleware/fetchuser")


//ROUTE 1: Get all notes api/auth/fetchnotes. login required

router.get('/fetchnotes', fetchuser, async (req, res) => {

    try {

        const notes = await Notes.find({ user: req.user.id })
        res.json(notes)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error occured")
    }


})

//ROUTE 2: add notes api/auth/addnotes. login required

router.post('/addnotes', fetchuser, [

    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Decription must be atleast 5 characters').isLength({ min: 5 }),


], async (req, res) => {

    try {

        const { title, description, tag } = req.body;
        // checking weather entered data is valid or through errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Notes({

            title, description, tag, user: req.user.id

        })

        const savedNote = await note.save();

        res.json(savedNote);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error occured")
    }


})

//ROUTE 3: update/edit notes api/auth/updatenote/:id. login required

router.put('/updatenote/:id', fetchuser, async (req, res) => {

    try {

        const { title, description, tag } = req.body;

        //create a newNote object

        const newNote = {};

        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") };

        if (note.user.toString() !== req.user.id) {

            return res.status(401).send("Not Allowed");

        }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json(note);

    } catch (error) {

        console.error(error.message);
        res.status(500).send("some error occured")

    }

})

//ROUTE 4: Delete Notes api/auth/deletenote/:id. login required

router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    try {

        //find the note

        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") };

        // match owner of notes

        if (note.user.toString() !== req.user.id) {

            return res.status(401).send("Not Allowed");

        }

        //delete note

        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({ "success": "Note deleted", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error occured")
    }
})

module.exports = router