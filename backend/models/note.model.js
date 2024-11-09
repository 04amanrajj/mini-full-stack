const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
  title: { type: String, required: true },
  note: { type: String, required: true },
  category: { type: String, required: true },
  user: String,
});

exports.NoteModel = mongoose.model("note", noteSchema);
