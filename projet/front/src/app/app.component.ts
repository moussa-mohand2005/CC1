import { Component } from '@angular/core';
import { FactureFormComponent } from './components/facture-form/facture-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [FactureFormComponent]
})
export class AppComponent {
  title = 'front';
}