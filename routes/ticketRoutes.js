
// const express = require("express");
// const Ticket = require("../models/Ticket");
// const jwt = require("jsonwebtoken");

// const router = express.Router();

// // Middleware for authentication
// const auth = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   if (!token) return res.status(401).json({ error: "Unauthorized" });

//   try {
//     req.user = jwt.verify(token, process.env.JWT_SECRET);
//     next();
//   } catch {
//     res.status(403).json({ error: "Invalid token" });
//   }
// };

// // Middleware for admin authorization
// const authorizeAdmin = (req, res, next) => {
//   if (req.user.role !== "admin") {
//     return res.status(403).json({ error: "Admin access required" });
//   }
//   next();
// };


// router.post("/tickets", auth, async (req, res) => {
//   // if (req.user.role !== "user") {
//     if (req.user.role !== "user" && req.user.role !== "admin") {
//     return res.status(403).json({ error: "Only users can create tickets" });
//   }

//   const { title, description } = req.body;
//   const ticket = new Ticket({ title, description, userId: req.user.userId });
//   await ticket.save();
//   res.status(201).json(ticket);
// });

// // Get tickets (Admin only)
// router.get("/tickets", auth, authorizeAdmin, async (req, res) => {
//   const tickets = await Ticket.find();
//   res.json(tickets);
// });

// router.get("/tickets/:id", auth, authorizeAdmin, async (req, res) => {
//   try {
//     const ticket = await Ticket.findById(req.params.id);
//     if (!ticket) {
//       return res.status(404).json({ error: "Ticket not found" });
//     }

//     res.status(200).json(ticket);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });
// router.get("/tickets/user/:userId", auth, async (req, res) => {
//   try {
//     const userId = req.params.userId;

//     // Ensure userId is defined
//     if (!userId) {
//       return res.status(400).json({ error: "User ID is required" });
//     }

//     // Allow access if the requester is an admin or the user themselves
//     // if (req.user.role !== 'user' && req.user._id.toString() !== userId) {
//     //   return res.status(403).json({ error: "Access denied" });
//     // }

//     const tickets = await Ticket.find({ userId });
//     if (tickets.length === 0) {
//       return res.status(404).json({ error: "No tickets found for this user" });
//     }

//     res.status(200).json(tickets);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });
// // Update ticket status (Admin only)
// router.put("/tickets/:id", auth, authorizeAdmin, async (req, res) => {
//   const { status } = req.body;
//   const ticket = await Ticket.findByIdAndUpdate(req.params.id, { status }, { new: true });
//   res.json(ticket);
// });

// module.exports = router;
const express = require("express");
const {
  createTicket,
  getAllTickets,
  getTicketById,
  getUserTickets,
  updateTicketStatus,
} = require("../controllers/ticketController");
const { authenticate, authorizeAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/tickets", authenticate, createTicket);
router.get("/tickets", authenticate, authorizeAdmin, getAllTickets);
router.get("/tickets/:id", authenticate, authorizeAdmin, getTicketById);
router.get("/tickets/user/:userId", authenticate, getUserTickets);
router.put("/tickets/:id", authenticate, authorizeAdmin, updateTicketStatus);

module.exports = router;
