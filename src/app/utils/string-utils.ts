export class StringUtils {

  public static isNullOrEmpty(val: string): boolean {

    return (val === null || val === undefined || val.trim() === '');

  }

  public static somenteNumeros(numero: string) : string {
    return numero ? numero.replace(/\D/g, '') : numero;
  }

}
