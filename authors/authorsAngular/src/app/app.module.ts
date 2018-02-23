import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { HttpService } from './http.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { MainComponentComponent } from './main-component/main-component.component';
import { AddComponentComponent } from './add-component/add-component.component';
import { EditComponentComponent } from './edit-component/edit-component.component';
import { QuotesComponent } from './quotes/quotes.component';
import { AddQuotesComponent } from './add-quotes/add-quotes.component';


@NgModule({
  declarations: [
    AppComponent,
    MainComponentComponent,
    AddComponentComponent,
    EditComponentComponent,
    QuotesComponent,
    AddQuotesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
