import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FactureFormComponent } from './facture-form/facture-form.component';

const routes: Routes = [
  { path: '', redirectTo: 'facture', pathMatch: 'full' },
  { path: 'facture', component: FactureFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
