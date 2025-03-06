// const express = require("express");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const User = require("../models/User");
// const { authenticate, authorizeAdmin } = require("../middleware/authMiddleware");

// const router = express.Router();
// const JWT_SECRET = process.env.JWT_SECRET;

// // Signup
// router.post("/signup", async (req, res) => {
//   const { name, email, password, role } = req.body;
//   const hashedPassword = await bcrypt.hash(password, 10);

//   try {
//     const user = new User({ name, email, password: hashedPassword, role });
//     await user.save();
//     res.status(201).json({ message: "User created successfully" });
//   } catch (err) {
//     res.status(400).json({ error: "User already exists" });
//   }
// });

// // Login
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });

//   if (!user || !(await bcrypt.compare(password, user.password))) {
//     return res.status(401).json({ error: "Invalid credentials" });
//   }

//   const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: "1h" });
//   res.json({ token, role: user.role, userId: user._id });
// });
// // Get all users (Admin only)
// router.get("/users", authenticate, authorizeAdmin, async (req, res) => {
//   try {
//     const users = await User.find();
//     res.status(200).json(users);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });
// // Get user by ID (Admin or the user themselves)
// router.get("/users/:id", authenticate, async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     // Allow access if the requester is an admin or the user themselves
//     if (req.user.role !== 'admin' && req.user._id.toString() !== req.params.id) {
//       return res.status(403).json({ error: "Access denied" });
//     }

//     res.status(200).json(user);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });
// module.exports = router;

const express = require("express");
const { signup, login, getAllUsers, getUserById } = require("../controllers/authController");
const { authenticate, authorizeAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/users", authenticate, authorizeAdmin, getAllUsers);
router.get("/users/:id", authenticate, getUserById);

module.exports = router;