import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { fromEvent, merge, Observable, of, scheduled } from 'rxjs';

import { Usuario } from '../models/usuario.model';
import { ContaService } from '../services/conta.service';
import { DisplayMessage, GenericValidator, ValidationMessages } from 'src/app/utils/generic-form-validation';

import { CustomValidators } from 'ngx-custom-validators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html'
})
export class CadastroComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[] | undefined;

  errors: any[] = [];

  cadastroForm: FormGroup = this.fb.group({});
  usuario: Usuario = this.cadastroForm.value;

  validationMessages: ValidationMessages = {};
  geneticValidator: GenericValidator = new GenericValidator(this.validationMessages);
  displayMessage: DisplayMessage = {};

  mudancasNaoSalvas: boolean = false;

  constructor(private fb: FormBuilder, private contaService: ContaService, private router: Router, private toastr: ToastrService) {
    this.validationMessages = {
      email: {
        required: 'informe o e-mail',
        email: 'Email inválido'
      },
      password: {
        required: 'Informe a senha',
        rangeLength: 'A senha deve possuir entre 6 e 15 caracteres'
      },
      confirmPassword: {
        required: 'Informe a senha novamente',
        rangeLength: 'A senha deve possuir entre 6 e 15 caracteres',
        equalTo: 'As senhas não conferem'
      }
    }

    this.geneticValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {

    let senha = new FormControl('', [Validators.required, CustomValidators.rangeLength([6, 15])]);
    let senhaConfirm = new FormControl('', [Validators.required, CustomValidators.rangeLength([6, 15]), CustomValidators.equalTo(senha)]);

    this.cadastroForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: senha,
      confirmPassword: senhaConfirm
    })

  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = (this.formInputElements as any)
    .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.geneticValidator.processarMensagens(this.cadastroForm);
      this.mudancasNaoSalvas = true;
    });

    this.mudancasNaoSalvas = false;
  }

  adicionarConta() {

    if (this.cadastroForm.dirty && this.cadastroForm.valid){

      this.usuario = Object.assign({}, this.usuario, this.cadastroForm.value);

      this.contaService.cadastrarUsuario$(this.usuario)
      .subscribe(
        sucesso => this.processarSucesso(sucesso),
        falha => this.processarFalha(falha)
      );

    }

  }

  processarSucesso(response: any) {
    this.cadastroForm.reset();
    this.errors = [];

    this.contaService.LocalStorage.salvarDadosLocaisUsuario(response);

    let toast = this.toastr.success('Registro realizado com Sucesso!', 'Bem vindo!!')

    if(toast){
      toast.onHidden
      .subscribe(() => {
        this.router.navigate(['/home']);
      });
    }
  }

  processarFalha(fail: any){
    this.errors = fail.error.errors;
    this.toastr.error('Ocorreu um erro!', 'Opa :(')
  }

}
