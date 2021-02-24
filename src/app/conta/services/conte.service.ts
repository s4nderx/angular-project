import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Usuario } from "../models/usuario.model";

@Injectable()
export class ContaService {

  constructor(private http: HttpClient) {}

  cadastrarUsuario(usuario: Usuario) {

  }

  login(usuario: Usuario) {

  }

}
