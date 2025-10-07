import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import { DataServiceLibros } from './services/datalibros.service';
import { LibrosService } from './services/libros.service';
import { CrudLibrosComponent } from './components/RegistroLibro/crudRegistro.component';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { DataServiceSubasta } from './services/dataSubasta.service';
import { SubastaService } from './services/subasta.service';
import { DataServiceLibros2 } from './services/dataLibros2.service';

import { DataServiceOferta } from './services/dataNuevaOfertaservice';
import { NuevaOfertaService } from './services/NuevaOferta.service';
import { DataServiceEditorial } from './services/dataEditorial.service';
import { DataServiceGenero } from './services/dataGeneroservice';
import { GeneroService } from './services/genero.service';
import { EditorialService } from './services/editorial.service';
import { Libro2Component } from './components/RegistroSubasta/libro2.component';
import { Libros2Service } from './services/libros2.service';
import { AuthService } from './services/login.servivio';
import { PagLoginComponent } from './components/Login/login.component';
import { OfertaComponent } from './components/Oferta/oferta.component';
import { DatePipe } from '@angular/common';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
//import { ComponentsComponent } from './GestionUsuarios/components/components.component';


//import {ComponentsComponent}
import { ComponentsComponent } from './GestionUsuarios/components/components.component';
import { VerusuariosComponent } from './components/verusuarios/verusuarios.component';
import { RecaptchaModule, ReCaptchaV3Service } from 'ng-recaptcha';


//import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [ 
    AppComponent,
    CrudLibrosComponent,
    Libro2Component,
    PagLoginComponent,
    OfertaComponent,
    ComponentsComponent,
    VerusuariosComponent
        // SubastaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule/*,
    DataTablesModule*/
    , HttpClientModule,
    RecaptchaModule
  ],
  providers: [
    provideClientHydration(),
    //provideHttpClient(withFetch()),
    DataServiceLibros,
    DataServiceLibros2,
    DataServiceSubasta,
    DataServiceOferta,
    DataServiceEditorial,
    DataServiceGenero,
    SubastaService,
    LibrosService,
    NuevaOfertaService,
    Libros2Service,
    GeneroService,
    EditorialService,
    AuthService,
    DatePipe,
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
