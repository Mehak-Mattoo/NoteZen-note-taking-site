const Note = require("../models/noteModels");
const asyncHandler = require("express-async-handler");

const getnotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({ user: req.user.id });
  res.json(notes);
});

const createNotes = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;

  if (!title || !content || !category) {
    res.status(400);
    throw new Error("Please fill all the fields");
  } else {
    const note = new Note({ user: req.user.id, title, content, category });

    const createdNote = await note.save();

    res.status(201).json(createdNote);
  }
});

const getNoteById = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (note) {
    res.json(note);
  } else {
    res.status(404).json({ message: "Note not found" });
  }
});

const updateNote = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;
  const note = await Note.findById(req.params.id);

  if (note.user.toString() !== req.user.id.toString()) {
    res.status(401);
    throw new Error("You cannot perform this action");
  }

  if (note) {
    note.title = title;
    note.content = content;
    note.category = category;

    const updateNote = await note.save();
    res.json(updateNote);
  } else {
    res.status(404);
    throw new Error("Note not found");
  }
});

const deleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (note.user.toString() !== req.user.id.toString()) {
    res.status(401);
    throw new Error("You cannot perform this action");
  }

  if (note) {
    await note.deleteOne();
    res.json({ message: "Note removed" });
  } else {
    res.status(404);
    throw new Error("Note not found");
  }
});

module.exports = { getnotes, createNotes, getNoteById, updateNote, deleteNote };
