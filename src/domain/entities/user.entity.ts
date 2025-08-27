/**
 * Não houve nenhuma definição para a entidade de usuário então criei uma básica.
 */
export class User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;

  constructor(props: User) {
    Object.assign(this, props);
  }
}
