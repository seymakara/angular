import { MainComponentComponent } from './main-component/main-component.component';
import { AddComponentComponent } from './add-component/add-component.component';
import { EditComponentComponent } from './edit-component/edit-component.component';
import { QuotesComponent } from './quotes/quotes.component';
import { AddQuotesComponent } from './add-quotes/add-quotes.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: MainComponentComponent },
  { path: 'new', component: AddComponentComponent },
  { path: 'edit/:id', component: EditComponentComponent },
  { path: 'quotes/:id', component: QuotesComponent },
  { path: 'write/:id', component: AddQuotesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
