Système de Gestion des Factures
Un système moderne et complet de gestion des factures, permettant la création, la gestion dynamique, et l’exportation de factures en PDF, avec une interface utilisateur intuitive et responsive.
Fonctionnalités
Gestion des Factures
•	Création de nouvelles factures
•	Sélection d’un client existant
•	Ajout/Suppression dynamique de lignes produits
•	Calcul automatique des montants : HT, TVA (20 %), TTC
•	Téléchargement de la facture au format PDF
•	Validation et retour en temps réel
Interface Utilisateur
•	Design moderne avec TailwindCSS
•	Responsive (adapté aux mobiles)
•	Transitions fluides avec Angular Animations
•	Feedback utilisateur : messages d’erreur, confirmations, loaders
Calculs Dynamiques
•	Montant HT par produit (prix unitaire × quantité)
•	Total HT global
•	Calcul TVA (20 %)
•	Total TTC
•	Mise à jour en temps réel à chaque modification
Stack Technique
Frontend
•	Angular 15+
•	TailwindCSS
•	TypeScript
•	Angular Reactive Forms
•	Angular Animations
Backend
•	Node.js
•	Express
•	MongoDB
•	Mongoose
Outils
•	npm
•	Git
•	VS Code
•	Postman
Fonctionnalité PDF
Le système intègre une fonctionnalité de génération et téléchargement de la facture au format PDF, accessible depuis l’interface avec un seul clic. Cette fonctionnalité facilite l’archivage et le partage des factures.
Présentation du projet
Ce projet est une application web moderne de gestion des factures, conçue pour simplifier le processus de facturation dans les petites entreprises et chez les indépendants. L'utilisateur peut créer une facture en quelques clics : il sélectionne un client depuis une liste, ajoute dynamiquement les produits à facturer, et l’application se charge automatiquement de calculer les montants HT, la TVA (fixée à 20 %) et le montant TTC.
Une attention particulière a été portée à l’expérience utilisateur : l’interface est responsive (adaptée aux téléphones), les formulaires sont validés en temps réel, et chaque interaction est accompagnée de messages clairs et de transitions fluides. L’interface permet également l’ajout ou la suppression de lignes produits à la volée sans recharger la page.
L’un des points forts de ce projet est la possibilité de télécharger la facture au format PDF, ce qui permet de l’imprimer ou de l’envoyer par mail au client. Cette fonctionnalité est très utile pour l’archivage numérique ou la comptabilité.
Le backend développé avec Node.js et Express assure la gestion des clients, produits et factures, tandis que MongoDB stocke toutes les données. Le frontend repose sur Angular pour une navigation fluide et dynamique, et TailwindCSS pour un design propre et professionnel.
Ce projet peut être utilisé tel quel ou facilement adapté pour des besoins plus spécifiques.

