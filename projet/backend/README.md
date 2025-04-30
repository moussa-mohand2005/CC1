# Système de Facturation - Backend

Ce backend Express avec MongoDB est conçu pour fonctionner avec votre application frontend Angular de facturation.

## Structure du Projet

```
backend/
  ├── config/
  │   └── db.js
  ├── controllers/
  │   ├── clientController.js
  │   ├── commandeController.js
  │   └── produitController.js
  ├── models/
  │   ├── clientModel.js
  │   ├── commandeModel.js
  │   └── produitModel.js
  ├── routes/
  │   ├── clientRoutes.js
  │   ├── commandeRoutes.js
  │   └── produitRoutes.js
  ├── .env
  ├── package.json
  ├── README.md
  └── server.js
```

## Installation

1. Assurez-vous que MongoDB est installé et en cours d'exécution sur votre machine
2. Ouvrez un terminal dans le dossier `backend`
3. Installez les dépendances:

```
npm install
```

4. Démarrez le serveur:

```
npm run dev
```

## API Endpoints

### Clients
- `GET /api/clients` - Obtenir tous les clients
- `GET /api/clients/:id` - Obtenir un client par ID
- `POST /api/clients` - Créer un nouveau client
- `PUT /api/clients/:id` - Mettre à jour un client
- `DELETE /api/clients/:id` - Supprimer un client

### Produits
- `GET /api/produits` - Obtenir tous les produits
- `GET /api/produits/:id` - Obtenir un produit par ID
- `POST /api/produits` - Créer un nouveau produit
- `PUT /api/produits/:id` - Mettre à jour un produit
- `DELETE /api/produits/:id` - Supprimer un produit

### Commandes (Factures)
- `GET /api/commandes` - Obtenir toutes les commandes
- `GET /api/commandes/:id` - Obtenir une commande par ID
- `POST /api/commandes` - Créer une nouvelle commande
- `PUT /api/commandes/:id` - Mettre à jour une commande
- `DELETE /api/commandes/:id` - Supprimer une commande

## Modèles de Données

### Client
```
{
  "name": "String (required)",
  "age": "Number (required)",
  "email": "String (required, unique)"
}
```

### Produit
```
{
  "nom": "String (required)",
  "prixUnitaire": "Number (required)",
  "categorie": "String (optional)"
}
```

### Commande
```
{
  "client": "ObjectId (required, ref: Client)",
  "date": "Date (required, default: now)",
  "produits": [
    {
      "produit": "ObjectId (ref: Produit)",
      "nom": "String (required)",
      "quantite": "Number (required)",
      "prixUnitaire": "Number (required)",
      "total": "Number (required)"
    }
  ],
  "totalHT": "Number (required)",
  "tva": "Number (required)",
  "totalTTC": "Number (required)"
}
```

## Configuration

Le fichier `.env` contient les variables d'environnement:

- `PORT`: Port du serveur (par défaut: 5000)
- `MONGO_URI`: URI de connexion à MongoDB
- `NODE_ENV`: Environnement (development/production)
