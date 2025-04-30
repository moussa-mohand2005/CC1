const mongoose = require('mongoose');

const commandeSchema = mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Client',
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    produits: [
      {
        produit: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Produit',
        },
        nom: {
          type: String,
          required: true,
        },
        quantite: {
          type: Number,
          required: true,
          default: 1,
        },
        prixUnitaire: {
          type: Number,
          required: true,
          default: 0,
        },
        total: {
          type: Number,
          required: true,
          default: 0,
        },
      },
    ],
    totalHT: {
      type: Number,
      required: true,
      default: 0,
    },
    tva: {
      type: Number,
      required: true,
      default: 0,
    },
    totalTTC: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Commande = mongoose.model('Commande', commandeSchema);

module.exports = Commande;
