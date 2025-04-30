const Commande = require('../models/commandeModel');
const Client = require('../models/clientModel');
const Produit = require('../models/produitModel');

// @desc    Get all orders
// @route   GET /api/commandes
// @access  Public
const getCommandes = async (req, res) => {
  try {
    const commandes = await Commande.find({})
      .populate('client', 'name email')
      .populate('produits.produit');
    res.json(commandes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get order by ID
// @route   GET /api/commandes/:id
// @access  Public
const getCommandeById = async (req, res) => {
  try {
    const commande = await Commande.findById(req.params.id)
      .populate('client', 'name email')
      .populate('produits.produit');
    
    if (commande) {
      res.json(commande);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create an order
// @route   POST /api/commandes
// @access  Public
const createCommande = async (req, res) => {
  try {
    const { client: clientId, date, produits } = req.body;
    
    // Verify client exists
    const client = await Client.findById(clientId);
    if (!client) {
      return res.status(400).json({ message: 'Client not found' });
    }
    
    // Calculate totals
    let totalHT = 0;
    
    // Process products
    const commandeProduits = [];
    
    for (const item of produits) {
      const { produitId, nom, quantite, prixUnitaire } = item;
      
      // If produitId is provided, verify it exists
      if (produitId) {
        const produit = await Produit.findById(produitId);
        if (!produit) {
          return res.status(400).json({ message: `Product with ID ${produitId} not found` });
        }
      }
      
      const total = quantite * prixUnitaire;
      totalHT += total;
      
      commandeProduits.push({
        produit: produitId,
        nom,
        quantite,
        prixUnitaire,
        total,
      });
    }
    
    const tva = totalHT * 0.2; // 20% TVA
    const totalTTC = totalHT + tva;
    
    const commande = await Commande.create({
      client: clientId,
      date: date || Date.now(),
      produits: commandeProduits,
      totalHT,
      tva,
      totalTTC,
    });
    
    if (commande) {
      res.status(201).json(commande);
    } else {
      res.status(400).json({ message: 'Invalid order data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update an order
// @route   PUT /api/commandes/:id
// @access  Public
const updateCommande = async (req, res) => {
  try {
    const { client: clientId, date, produits } = req.body;
    
    const commande = await Commande.findById(req.params.id);
    
    if (!commande) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    // Verify client exists if provided
    if (clientId) {
      const client = await Client.findById(clientId);
      if (!client) {
        return res.status(400).json({ message: 'Client not found' });
      }
      commande.client = clientId;
    }
    
    if (date) {
      commande.date = date;
    }
    
    // Update products if provided
    if (produits && produits.length > 0) {
      // Calculate totals
      let totalHT = 0;
      
      // Process products
      const commandeProduits = [];
      
      for (const item of produits) {
        const { produitId, nom, quantite, prixUnitaire } = item;
        
        // If produitId is provided, verify it exists
        if (produitId) {
          const produit = await Produit.findById(produitId);
          if (!produit) {
            return res.status(400).json({ message: `Product with ID ${produitId} not found` });
          }
        }
        
        const total = quantite * prixUnitaire;
        totalHT += total;
        
        commandeProduits.push({
          produit: produitId,
          nom,
          quantite,
          prixUnitaire,
          total,
        });
      }
      
      const tva = totalHT * 0.2; // 20% TVA
      const totalTTC = totalHT + tva;
      
      commande.produits = commandeProduits;
      commande.totalHT = totalHT;
      commande.tva = tva;
      commande.totalTTC = totalTTC;
    }
    
    const updatedCommande = await commande.save();
    res.json(updatedCommande);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete an order
// @route   DELETE /api/commandes/:id
// @access  Public
const deleteCommande = async (req, res) => {
  try {
    const commande = await Commande.findById(req.params.id);
    
    if (commande) {
      await commande.deleteOne();
      res.json({ message: 'Order removed' });
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCommandes,
  getCommandeById,
  createCommande,
  updateCommande,
  deleteCommande,
};
