export class LocalStorageUtils {

  public obterUsuario() {
      const user = localStorage.getItem('devio.user')
      return user ? JSON.parse(user) : ''
  }

  public salvarDadosLocaisUsuario(response: any) {
      this.salvarTokenUsuario(response.accessToken);
      this.salvarUsuario(response.userToken);
  }

  public limparDadosLocaisUsuario() {
      localStorage.removeItem('devio.token');
      localStorage.removeItem('devio.user');
  }

  public obterTokenUsuario(): any {
      return localStorage.getItem('devio.token') || null;
  }

  public salvarTokenUsuario(token: string) {
      localStorage.setItem('devio.token', token);
  }

  public salvarUsuario(user: string) {
      localStorage.setItem('devio.user', JSON.stringify(user));
  }

}
