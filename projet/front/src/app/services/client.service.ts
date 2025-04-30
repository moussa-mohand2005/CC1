import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:5000/api';

export interface Client {
  _id?: string;
  name: string;
  age: number;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  constructor(private http: HttpClient) { }

  // Get all clients
  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${API_URL}/clients`);
  }

  // Get client by ID
  getClientById(id: string): Observable<Client> {
    return this.http.get<Client>(`${API_URL}/clients/${id}`);
  }

  // Create new client
  createClient(client: Client): Observable<Client> {
    return this.http.post<Client>(`${API_URL}/clients`, client);
  }

  // Update client
  updateClient(id: string, client: Client): Observable<Client> {
    return this.http.put<Client>(`${API_URL}/clients/${id}`, client);
  }

  // Delete client
  deleteClient(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${API_URL}/clients/${id}`);
  }
}
