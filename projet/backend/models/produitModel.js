const mongoose = require('mongoose');

const produitSchema = mongoose.Schema(
  {
    nom: {
      type: String,
      required: true,
    },
    prixUnitaire: {
      type: Number,
      required: true,
      default: 0,
    },
    categorie: {
      type: String,
      required: false,
    }
  },
  {
    timestamps: true,
  }
);

const Produit = mongoose.model('Produit', produitSchema);

module.exports = Produit;
