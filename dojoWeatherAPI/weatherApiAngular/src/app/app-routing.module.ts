import { SanJoseComponent } from './san-jose/san-jose.component';
import { SeattleComponent } from './seattle/seattle.component';
import { BurbankComponent } from './burbank/burbank.component';
import { DallasComponent } from './dallas/dallas.component';
import { WashingtonComponent } from './washington/washington.component';
import { ChicagoComponent } from './chicago/chicago.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'sanJose',component: SanJoseComponent },
  { path: 'seattle',component: SeattleComponent},
  { path: 'burbank',component: BurbankComponent },
  { path: 'dallas',component: DallasComponent },
  { path: 'washington',component: WashingtonComponent },
  { path: 'chicago',component: ChicagoComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
