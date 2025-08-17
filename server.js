import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import multer from "multer";
import fs from "fs";

const app = express();
app.use(express.json());
const allowedOrigins = [
  "https://notes-sharing-web-world.vercel.app",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
const JWT_SECRET = process.env.JWT_SECRET;
const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 5000;
app.use("/uploads", express.static("uploads"));

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

//user
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});
const User = mongoose.model("User", userSchema);

//notes
const noteSchema = new mongoose.Schema({
  title: String,
  description: String,
  filePath: String,
  uploadedBy: String,
  createdAt: { type: Date, default: Date.now },
});
const Note = mongoose.model("Note", noteSchema);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync("uploads")) fs.mkdirSync("uploads");
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.get("/notes", async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: "Error in fetching all notes" });
  }
});

app.post("/auth/register", async (req, res) => {
  try {
    const trimmedPassword = password.trim();
    if (!trimmedPassword) {
      return res.status(400).json({ error: "Password cannot be empty" });
    }

    const hashedPassword = await bcrypt.hash(trimmedPassword, 10); // Use trimmed password
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User Registered Successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error Occured in Registration" });
  }
});

app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User Not Found" });
    }

    const trimmedPassword = password.trim();
    const isMatch = await bcrypt.compare(trimmedPassword, user.password); // Compare trimmed

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid Password" });
    }

    const token = jwt.sign(
      { username: user.username, email: user.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ message: "Login Successfully", token });
  } catch (error) {
    res.status(500).json({ error: "Error Occured during LOGIN" });
  }
});

app.post("/notes/upload", upload.single("file"), async (req, res) => {
  const { title, description, username } = req.body;
  const normalizedUsername = username.trim().toLowerCase(); // Normalize here

  try {
    const note = new Note({
      title,
      description,
      filePath: req.file?.path || "",
      uploadedBy: normalizedUsername, // Store normalized version
    });
    await note.save();
    res.status(201).json({ message: "Note uploaded" });
  } catch (error) {
    res.status(500).json({ error: "Error during note upload" });
  }
});

app.get("/notes/user/:username", async (req, res) => {
  try {
    const normalizedUsername = decodeURIComponent(req.params.username)
      .trim()
      .toLowerCase();
    const notes = await Note.find({ uploadedBy: normalizedUsername }); // Exact match

    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: "Notes Not Found" });
  }
});

app.delete("/notes/:id", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ error: "Note not found" });
    if (fs.existsSync(note.filePath)) fs.unlinkSync(note.filePath);
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: "Note Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error occured during deletion" });
  }
});

app.put("/notes/update/:id", upload.single("file"), async (req, res) => {
  const { title, description } = req.body;

  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ error: "Note not found" });

    if (req.file) {
      if (note.filePath && fs.existsSync(note.filePath)) {
        fs.unlinkSync(note.filePath);
      }
      note.filePath = req.file.path;
    }

    note.title = title || note.title;
    note.description = description || note.description;
    await note.save();

    res.json({ message: "Note Updated" });
  } catch (err) {
    res.status(500).json({ error: "Error Update" });
  }
});

app.get("/notes/view/:id", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note Not Found" });
    res.json({ filePath: `http://localhost:${PORT}/${note.filePath}` });
  } catch (error) {
    res.status(500).json({ error: "Notes Not Found" });
  }
});

app.listen(PORT, () => console.log("server running"));
