const express = require('express');
const router = express.Router();
const { 
  getCommandes, 
  getCommandeById, 
  createCommande, 
  updateCommande, 
  deleteCommande 
} = require('../controllers/commandeController');

router.route('/')
  .get(getCommandes)
  .post(createCommande);

router.route('/:id')
  .get(getCommandeById)
  .put(updateCommande)
  .delete(deleteCommande);

module.exports = router;
