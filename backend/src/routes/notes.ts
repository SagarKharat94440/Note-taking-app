import { Router } from "express";
import Note from "../models/Note.js"; // Aapka Note model
import { AuthRequest } from "../middleware/auth.js"; 

const router = Router();

// GET /api/notes - Sirf logged-in user ke notes fetch karega
router.get("/", async (req: AuthRequest, res) => {
  try {
    // Badlav: 'createdBy' ko 'userId' se replace kiya
    const notes = await Note.find({ userId: req.user.userId }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/notes - Naya note banayega
router.post("/", async (req: AuthRequest, res) => {
  try {
    const { title, content } = req.body;
    const newNote = new Note({
      title,
      content,
      // Badlav: 'createdBy' ko 'userId' se replace kiya
      userId: req.user.userId, 
    });
    await newNote.save();
    res.status(201).json(newNote);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /api/notes/:id - Note delete karega
router.delete("/:id", async (req: AuthRequest, res) => {
  try {
    // Badlav: 'createdBy' ko 'userId' se replace kiya
    const note = await Note.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json({ message: "Note deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;