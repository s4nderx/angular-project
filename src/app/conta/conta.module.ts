/* Angular modules */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'

/* My Components */
import { CadastroComponent } from './cadastro/cadastro.component';
import { LoginComponent } from './login/login.component';

/* My Modules */
import { ContaRouterModule } from './conta.route';
import { ContaAppComponent } from './conta.app.component';
import { ContaService } from './services/conte.service';
import { CustomFormsModule } from 'ngx-custom-validators';

@NgModule({
  declarations: [
    ContaAppComponent,
    CadastroComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ContaRouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CustomFormsModule
  ],
  providers: [
    ContaService
  ]
})
export class ContaModule { }
