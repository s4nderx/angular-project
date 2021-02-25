import { HttpErrorResponse, HttpHeaders } from "@angular/common/http"
import { throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { LocalStorageUtils } from "../utils/localstorage";

export abstract class BaseService{

  public LocalStorage = new LocalStorageUtils();

  protected _UrlServiceV1: string = environment.apiUrlv1;

  protected _obterHeaderJson() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
  }

  protected _extractData(response: any){
    return response.data || {};
  }

  protected _serviceError(response: Response | any) {
      let customError: string[] = [];

      if(response instanceof HttpErrorResponse){
        if(response.statusText === 'Unknown Error') {
          customError.push("Ocorreu um erro desconhecido");
          response.error.errors = customError;
        }
      }

      console.error(response);
      return throwError(response);
  }

}
