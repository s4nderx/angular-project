import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { BaseService } from 'src/app/services/base.service';
import { Fornecedor } from '../models/fornecedor';
import { CepConsulta } from "../models/endereco";

@Injectable()
export class FornecedorService extends BaseService {

    fornecedor: Fornecedor = new Fornecedor();

    constructor(private http: HttpClient) { super()

        this.fornecedor.nome = "Teste Fake"
        this.fornecedor.documento = "32165498754"
        this.fornecedor.ativo = true
        this.fornecedor.tipoFornecedor = 1
    }

    obterTodos(): Observable<Fornecedor[]> {
        return this.http
            .get<Fornecedor[]>(`${this._UrlServiceV1}/fornecedores`)
            .pipe(catchError(super._serviceError));
    }

    obterPorId(id: string): Observable<Fornecedor> {
        return new Observable<Fornecedor>();
    }

    novoFornecedor(fornecedor: Fornecedor): Observable<Fornecedor> {
      return this.http
      .post(`${this._UrlServiceV1}/fornecedores`, fornecedor, this._obterAuthHeaderJson())
      .pipe(
        map(super._extractData),
        catchError(super._serviceError)
      );
    }

    atualizarFornecedor(fornecedor: Fornecedor): Observable<Fornecedor> {
        return new Observable<Fornecedor>();
    }

    excluirFornecedor(id: string): Observable<Fornecedor> {
        return new Observable<Fornecedor>();
    }

    consultarCep(cep: string): Observable<CepConsulta> {
      return this.http.get<CepConsulta>(`https://viacep.com.br/ws/${cep}/json`)
      .pipe(catchError(super._serviceError))
    }
}
