const { NoteModel } = require("../models/note.model");

exports.allNotes = async (req, res) => {
  const notes = await NoteModel.find();
  res.status(200).send({ msg: notes });
};

exports.addNote = async (req, res) => {
  const payLoad = req.body;
  try {
    const newNote = new NoteModel(payLoad);
    await newNote.save();
    res.status(200).send({ msg: "Note created" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
};

exports.updateNote = async (req, res) => {
  const _id = req.params.id;
  const payLoad = req.body;

  //check for notes
  const note = await NoteModel.findOne({ _id });
  if (!note) return res.status(404).send({ msg: "note not found" });

  // Check if payload is empty
  if (Object.keys(payLoad).length === 0)
    return res.status(400).send({ msg: "Write something to update" });
  try {
    await NoteModel.findOneAndUpdate({ _id }, payLoad);
    res.status(200).send({ msg: "Note updated" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.deleteNote = async (req, res) => {
  const _id = req.params.id;

  //check for notes
  const note = await NoteModel.findOne({ _id });
  if (!note) return res.status(404).send({ msg: "note not found" });

  try {
    await NoteModel.findOneAndDelete({ _id });
    res.status(200).send({ msg: "Note deleted" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
