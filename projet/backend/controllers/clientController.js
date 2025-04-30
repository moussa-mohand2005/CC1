const Client = require('../models/clientModel');

// @desc    Get all clients
// @route   GET /api/clients
// @access  Public
const getClients = async (req, res) => {
  try {
    const clients = await Client.find({});
    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get client by ID
// @route   GET /api/clients/:id
// @access  Public
const getClientById = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    
    if (client) {
      res.json(client);
    } else {
      res.status(404).json({ message: 'Client not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a client
// @route   POST /api/clients
// @access  Public
const createClient = async (req, res) => {
  try {
    const { name, age, email } = req.body;
    
    const clientExists = await Client.findOne({ email });
    
    if (clientExists) {
      return res.status(400).json({ message: 'Client already exists' });
    }
    
    const client = await Client.create({
      name,
      age,
      email,
    });
    
    if (client) {
      res.status(201).json(client);
    } else {
      res.status(400).json({ message: 'Invalid client data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a client
// @route   PUT /api/clients/:id
// @access  Public
const updateClient = async (req, res) => {
  try {
    const { name, age, email } = req.body;
    
    const client = await Client.findById(req.params.id);
    
    if (client) {
      client.name = name || client.name;
      client.age = age || client.age;
      client.email = email || client.email;
      
      const updatedClient = await client.save();
      res.json(updatedClient);
    } else {
      res.status(404).json({ message: 'Client not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a client
// @route   DELETE /api/clients/:id
// @access  Public
const deleteClient = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    
    if (client) {
      await client.deleteOne();
      res.json({ message: 'Client removed' });
    } else {
      res.status(404).json({ message: 'Client not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
};
