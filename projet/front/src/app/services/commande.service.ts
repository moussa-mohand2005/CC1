import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from './client.service';
import { Produit } from './produit.service';

const API_URL = 'http://localhost:5000/api';

export interface ProduitCommande {
  produit?: string | Produit; // Optionnel pour compatibilité avec l'interface existante
  produitId?: string;        // Utilisé par le backend
  nom: string;
  quantite: number;
  prixUnitaire: number;
  total: number;
}

export interface Commande {
  _id?: string;
  client: string | Client;
  date: Date;
  produits: ProduitCommande[];
  totalHT: number;
  tva: number;
  totalTTC: number;
  createdAt?: string;
  updatedAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  constructor(private http: HttpClient) { }

  // Get all orders
  getCommandes(): Observable<Commande[]> {
    return this.http.get<Commande[]>(`${API_URL}/commandes`);
  }

  // Get order by ID
  getCommandeById(id: string): Observable<Commande> {
    return this.http.get<Commande>(`${API_URL}/commandes/${id}`);
  }

  // Create new order
  createCommande(commande: Commande): Observable<Commande> {
    return this.http.post<Commande>(`${API_URL}/commandes`, commande);
  }

  // Update order
  updateCommande(id: string, commande: Commande): Observable<Commande> {
    return this.http.put<Commande>(`${API_URL}/commandes/${id}`, commande);
  }

  // Delete order
  deleteCommande(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${API_URL}/commandes/${id}`);
  }
}
