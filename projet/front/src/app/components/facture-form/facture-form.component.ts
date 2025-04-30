import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientService, Client } from '../../services/client.service';
import { ProduitService, Produit } from '../../services/produit.service';
import { CommandeService, Commande, ProduitCommande } from '../../services/commande.service';

// Déclaration pour accéder aux bibliothèques chargées via CDN
declare const jspdf: any;
declare const html2canvas: any;
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-facture-form',
  templateUrl: './facture-form.component.html',
  styleUrls: ['./facture-form.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule]
})
export class FactureFormComponent implements OnInit {
  form: FormGroup;
  clients: Client[] = [];
  produits: Produit[] = [];
  loading = false;
  submitted = false;
  success = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private produitService: ProduitService,
    private commandeService: CommandeService
  ) {
    // Formatage de la date actuelle au format YYYY-MM-DD pour l'input de type date
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    
    this.form = this.fb.group({
      client: ['', Validators.required],
      date: [formattedDate, Validators.required],
      produits: this.fb.array([this.createProduit()])
    });
  }

  ngOnInit(): void {
    this.loadClients();
    this.loadProduits();
  }

  loadClients(): void {
    this.clientService.getClients().subscribe({
      next: (data) => {
        this.clients = data;
      },
      error: (error) => {
        console.error('Error loading clients:', error);
        this.error = 'Erreur lors du chargement des clients';
      }
    });
  }

  loadProduits(): void {
    this.produitService.getProduits().subscribe({
      next: (data) => {
        this.produits = data;
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.error = 'Erreur lors du chargement des produits';
      }
    });
  }

  get produitsArray(): FormArray {
    return this.form.get('produits') as FormArray;
  }

  createProduit(): FormGroup {
    return this.fb.group({
      produit: ['', Validators.required],
      nom: ['', Validators.required],
      quantite: [1, [Validators.required, Validators.min(1)]],
      prixUnitaire: [0, [Validators.required, Validators.min(0)]],
      total: [{ value: 0, disabled: true }]
    });
  }

  addProduit() {
    this.produitsArray.push(this.createProduit());
  }

  removeProduit(index: number) {
    this.produitsArray.removeAt(index);
  }
  
  onProduitSelect(index: number): void {
    const produitControl = this.produitsArray.at(index).get('produit');
    const nomControl = this.produitsArray.at(index).get('nom');
    const prixControl = this.produitsArray.at(index).get('prixUnitaire');
    
    if (produitControl && produitControl.value) {
      const selectedProduit = this.produits.find(p => p._id === produitControl.value);
      if (selectedProduit) {
        nomControl?.setValue(selectedProduit.nom);
        prixControl?.setValue(selectedProduit.prixUnitaire);
        this.calculerTotal(index);
      }
    }
  }

  calculerTotal(index: number) {
    const produit = this.produitsArray.at(index);
    const q = produit.get('quantite')?.value || 0;
    const p = produit.get('prixUnitaire')?.value || 0;
    const t = Number((q * p).toFixed(2)); // Arrondir à 2 décimales
    produit.get('total')?.setValue(t);
  }

  getTotalHT(): number {
    const total = this.produitsArray.controls.reduce((acc, cur) => {
      return acc + (cur.get('total')?.value || 0);
    }, 0);
    return Number(total.toFixed(2)); // Arrondir à 2 décimales
  }

  getTVA(): number {
    return Number((this.getTotalHT() * 0.20).toFixed(2)); // Arrondir à 2 décimales
  }

  getTotalTTC(): number {
    return Number((this.getTotalHT() + this.getTVA()).toFixed(2)); // Arrondir à 2 décimales
  }
  
  // Générer un PDF de la facture
  generatePDF(): void {
    if (this.form.invalid) {
      this.submitted = true;
      this.error = 'Veuillez remplir correctement le formulaire avant de générer le PDF';
      return;
    }
    
    const formData = this.form.getRawValue();
    
    // Trouver le nom du client sélectionné
    const client = this.clients.find(c => c._id === formData.client);
    const clientName = client ? client.name : 'Client inconnu';
    
    // Créer une nouvelle instance de jsPDF
    // @ts-ignore - Accès à la bibliothèque chargée via CDN
    const { jsPDF } = window['jspdf'];
    // @ts-ignore
    const doc = new jsPDF();
    
    // Définir les couleurs principales
    const primaryColor = [41, 128, 185]; // Bleu
    const secondaryColor = [44, 62, 80]; // Gris foncé
    const accentColor = [39, 174, 96]; // Vert
    
    // Ajouter un fond coloré en haut
    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.rect(0, 0, 210, 40, 'F');
    
    // Espace réservé pour un logo si nécessaire
    
    // Ajouter l'en-tête
    doc.setFontSize(28);
    doc.setTextColor(255, 255, 255);
    doc.text('FACTURE', 105, 25, { align: 'center' });
    
    // Espace pour les informations de l'entreprise
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    
    // Ajouter un cadre pour les informations du client
    doc.setDrawColor(230, 230, 230);
    doc.setFillColor(249, 249, 249);
    doc.roundedRect(15, 50, 180, 40, 3, 3, 'FD');
    
    // Ajouter les informations du client
    doc.setFontSize(12);
    doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
    doc.setFont('helvetica', 'bold');
    doc.text('INFORMATIONS CLIENT', 25, 60);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.text(`Client: ${clientName}`, 25, 70);
    doc.text(`Date: ${new Date(formData.date).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })}`, 25, 80);
    
    // Espace réservé pour d'autres informations si nécessaire
    
    // Préparer les données pour le tableau
    const tableColumn = ['Produit', 'Quantité', 'Prix unitaire', 'Total'];
    const tableRows: any[] = [];
    
    // Ajouter les produits au tableau
    formData.produits.forEach((produit: any) => {
      const produitData = this.produits.find(p => p._id === produit.produit);
      const produitNom = produitData ? produitData.nom : 'Produit inconnu';
      const total = Number((produit.quantite * produit.prixUnitaire).toFixed(2));
      
      tableRows.push([produitNom, produit.quantite, produit.prixUnitaire.toFixed(2) + ' DH', total.toFixed(2) + ' DH']);
    });
    
    // Ajouter le tableau avec un style amélioré
    (doc as any).autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 100,
      theme: 'grid',
      styles: { 
        fontSize: 10,
        cellPadding: 6,
        lineColor: [220, 220, 220],
        lineWidth: 0.1
      },
      headStyles: { 
        fillColor: primaryColor,
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        halign: 'center' 
      },
      columnStyles: {
        0: { fontStyle: 'bold' },
        3: { halign: 'right', fontStyle: 'bold' }
      },
      alternateRowStyles: {
        fillColor: [249, 249, 249]
      }
    });
    
    // Calculer la position Y après le tableau
    const finalY = (doc as any).lastAutoTable?.finalY + 10 || 150;
    
    // Ajouter un cadre pour le résumé des totaux
    doc.setDrawColor(220, 220, 220);
    doc.setFillColor(249, 249, 249);
    doc.roundedRect(110, finalY, 85, 40, 3, 3, 'FD');
    
    // Ajouter le résumé des totaux
    doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
    doc.setFontSize(10);
    doc.text('Total HT:', 120, finalY + 10);
    doc.text('TVA (20%):', 120, finalY + 20);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('TOTAL TTC:', 120, finalY + 32);
    
    // Ajouter les montants alignés à droite
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(`${this.getTotalHT().toFixed(2)} DH`, 185, finalY + 10, { align: 'right' });
    doc.text(`${this.getTVA().toFixed(2)} DH`, 185, finalY + 20, { align: 'right' });
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
    doc.text(`${this.getTotalTTC().toFixed(2)} DH`, 185, finalY + 32, { align: 'right' });
    
    // Ajouter une ligne de séparation avant le total TTC
    doc.setDrawColor(180, 180, 180);
    doc.line(120, finalY + 25, 185, finalY + 25);
    
    // Espace réservé pour d'autres informations si nécessaire
    const legalY = finalY + 60;
    
    // Ajouter un pied de page
    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.rect(0, 280, 210, 17, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.text('Merci pour votre confiance !', 105, 290, { align: 'center' });
    
    // Télécharger le PDF
    doc.save(`Facture_${clientName}_${new Date().toISOString().split('T')[0]}.pdf`);
  }

  onSubmit(): void {
    this.submitted = true;
    console.log('Form submitted', this.form.value);
    
    if (this.form.invalid) {
      console.error('Form is invalid', this.form.errors);
      return;
    }
    
    this.loading = true;
    this.error = '';
    
    const formData = this.form.getRawValue();
    console.log('Form data:', formData);
    
    // Vérifier que le client est sélectionné
    if (!formData.client) {
      this.error = 'Veuillez sélectionner un client';
      this.loading = false;
      return;
    }
    
    // Vérifier que les produits sont valides
    if (!formData.produits || formData.produits.length === 0) {
      this.error = 'Veuillez ajouter au moins un produit';
      this.loading = false;
      return;
    }
    
    try {
      // Simplifier la structure pour correspondre exactement à ce que le backend attend
      // Le backend attend: { client, date, produits: [{ produitId, nom, quantite, prixUnitaire }] }
      const produitsSimplifies = [];
      
      for (const p of formData.produits) {
        // Vérifier que le produit est valide
        if (!p.produit || !p.nom || !p.quantite || !p.prixUnitaire) {
          continue; // Ignorer les produits incomplets
        }
        
        produitsSimplifies.push({
          produitId: p.produit,
          nom: p.nom,
          quantite: Number(p.quantite),
          prixUnitaire: Number(p.prixUnitaire)
          // Ne pas inclure total, le backend le calculera
        });
      }
      
      // Vérifier qu'il y a au moins un produit valide
      if (produitsSimplifies.length === 0) {
        this.error = 'Aucun produit valide dans la commande';
        this.loading = false;
        return;
      }
      
      // Calculer les totaux (même si on ne les envoie pas, on les garde pour la compatibilité avec l'interface)
      const totalHT = this.getTotalHT();
      const tva = this.getTVA();
      const totalTTC = this.getTotalTTC();
      
      // Formater la date (utiliser la date actuelle si non spécifiée)
      const dateCommande = formData.date ? new Date(formData.date) : new Date();
      
      // Créer un objet qui correspond à l'interface Commande et aux attentes du backend
      const commandeData: Commande = {
        client: formData.client,
        date: dateCommande,
        produits: produitsSimplifies as any, // Cast pour compatibilité avec l'interface
        totalHT: totalHT,
        tva: tva,
        totalTTC: totalTTC
      };
      
      console.log('Commande à envoyer:', JSON.stringify(commandeData, null, 2));
      
      // Envoyer la commande au serveur
      this.commandeService.createCommande(commandeData).subscribe({
        next: (data) => {
          this.loading = false;
          this.success = true;
          console.log('Commande créée avec succès:', data);
          
          // Reset form after successful submission
          setTimeout(() => {
            // Réinitialiser le formulaire avec la date d'aujourd'hui
            const today = new Date();
            const formattedDate = today.toISOString().split('T')[0];
            
            this.form.reset({
              client: '',
              date: formattedDate
            });
            
            // Réinitialiser les produits
            this.produitsArray.clear();
            this.addProduit();
            
            this.submitted = false;
            this.success = false;
          }, 2000);
        },
        error: (error) => {
          this.loading = false;
          console.error('Error creating commande:', error);
          this.error = 'Erreur lors de la création de la commande: ' + (error.message || 'Vérifiez que le serveur backend est en cours d\'exécution');
        }
      });
    } catch (error: any) {
      this.loading = false;
      console.error('Erreur lors de la préparation de la commande:', error);
      this.error = 'Erreur lors de la préparation de la commande: ' + (error.message || 'Erreur inconnue');
    }
  }
}
