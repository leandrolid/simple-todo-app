import { Column, Entity, PrimaryColumn } from 'typeorm';

/**
 * Não houve nenhuma definição para a entidade de usuário então criei uma básica.
 */
@Entity('users')
export class User {
  @PrimaryColumn({
    type: 'uuid',
    generated: 'uuid',
  })
  id: string;

  @Column({ type: 'text', name: 'name' })
  name: string;

  @Column({ type: 'text', name: 'email', unique: true })
  email: string;

  @Column({ type: 'text', name: 'password' })
  password: string;

  @Column({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
