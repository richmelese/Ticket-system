const Ticket = require("../models/Ticket");

// Create a new ticket (User or Admin)
exports.createTicket = async (req, res) => {
  if (req.user.role !== "user" && req.user.role !== "admin") {
    return res.status(403).json({ error: "Only users and admins can create tickets" });
  }

  try {
    const { title, description } = req.body;
    const ticket = new Ticket({ title, description, userId: req.user._id });
    await ticket.save();

    // Construct the response object
    const response = {
      _id: ticket._id,
      userId: ticket.userId,
      title: ticket.title,
      description: ticket.description,
      status: ticket.status,
      __v: ticket.__v
    };

    res.status(201).json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Get all tickets (Admin only)
exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.status(200).json(tickets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get ticket by ID (Admin only)
exports.getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }
    res.status(200).json(ticket);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get tickets by user ID (Admin or the user themselves)
exports.getUserTickets = async (req, res) => {
  try {
    const userId = req.params.userId;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const tickets = await Ticket.find({ userId });
    if (tickets.length === 0) {
      return res.status(404).json({ error: "No tickets found for this user" });
    }

    res.status(200).json(tickets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update ticket status (Admin only)
exports.updateTicketStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const ticket = await Ticket.findByIdAndUpdate(req.params.id, { status }, { new: true });

    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    res.status(200).json(ticket);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
