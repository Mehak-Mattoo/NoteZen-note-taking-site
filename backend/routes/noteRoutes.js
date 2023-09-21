const express = require("express");
const {
  getnotes,
  createNotes,
  getNoteById,
  updateNote,
  deleteNote,
} = require("../controllers/notesController");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.route("/").get(protect, getnotes);
router.route("/create").post(protect, createNotes);
router
  .route("/:id")
  .get(getNoteById)
  .put(protect, updateNote)
  .delete(protect, deleteNote);

module.exports = router;
