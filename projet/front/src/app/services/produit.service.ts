import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:5000/api';

export interface Produit {
  _id?: string;
  nom: string;
  prixUnitaire: number;
  categorie?: string;
  createdAt?: string;
  updatedAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  constructor(private http: HttpClient) { }

  // Get all products
  getProduits(): Observable<Produit[]> {
    return this.http.get<Produit[]>(`${API_URL}/produits`);
  }

  // Get product by ID
  getProduitById(id: string): Observable<Produit> {
    return this.http.get<Produit>(`${API_URL}/produits/${id}`);
  }

  // Create new product
  createProduit(produit: Produit): Observable<Produit> {
    return this.http.post<Produit>(`${API_URL}/produits`, produit);
  }

  // Update product
  updateProduit(id: string, produit: Produit): Observable<Produit> {
    return this.http.put<Produit>(`${API_URL}/produits/${id}`, produit);
  }

  // Delete product
  deleteProduit(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${API_URL}/produits/${id}`);
  }
}
