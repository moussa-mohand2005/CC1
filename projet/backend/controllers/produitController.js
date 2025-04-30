const Produit = require('../models/produitModel');

// @desc    Get all products
// @route   GET /api/produits
// @access  Public
const getProduits = async (req, res) => {
  try {
    const produits = await Produit.find({});
    res.json(produits);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get product by ID
// @route   GET /api/produits/:id
// @access  Public
const getProduitById = async (req, res) => {
  try {
    const produit = await Produit.findById(req.params.id);
    
    if (produit) {
      res.json(produit);
    } else {
      res.status(404).json({ message: 'Produit not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a product
// @route   POST /api/produits
// @access  Public
const createProduit = async (req, res) => {
  try {
    const { nom, prixUnitaire, categorie } = req.body;
    
    const produit = await Produit.create({
      nom,
      prixUnitaire,
      categorie,
    });
    
    if (produit) {
      res.status(201).json(produit);
    } else {
      res.status(400).json({ message: 'Invalid product data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a product
// @route   PUT /api/produits/:id
// @access  Public
const updateProduit = async (req, res) => {
  try {
    const { nom, prixUnitaire, categorie } = req.body;
    
    const produit = await Produit.findById(req.params.id);
    
    if (produit) {
      produit.nom = nom || produit.nom;
      produit.prixUnitaire = prixUnitaire || produit.prixUnitaire;
      produit.categorie = categorie || produit.categorie;
      
      const updatedProduit = await produit.save();
      res.json(updatedProduit);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a product
// @route   DELETE /api/produits/:id
// @access  Public
const deleteProduit = async (req, res) => {
  try {
    const produit = await Produit.findById(req.params.id);
    
    if (produit) {
      await produit.deleteOne();
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProduits,
  getProduitById,
  createProduit,
  updateProduit,
  deleteProduit,
};
