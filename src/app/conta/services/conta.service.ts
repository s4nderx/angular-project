import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { BaseService } from "src/app/services/base.service";
import { Usuario } from "../models/usuario.model";

@Injectable()
export class ContaService extends BaseService {

  constructor(private http: HttpClient) { super(); }

  cadastrarUsuario$(usuario: Usuario): Observable<Usuario | any> {
    let response = this.http
    .post(`${this._UrlServiceV1}/nova-conta`, usuario, this._obterHeaderJson())
    .pipe(
      map(this._extractData),
      catchError(this._serviceError)
    );

    return response;
  }

  login(usuario: Usuario) {

  }

}
