import { Entity, Column } from 'typeorm'

import Abstract from './Abstract'

import Role from '../enum/Role'

@Entity('users')
export class User extends Abstract {
  @Column({ name: 'login_id', type: 'varchar', length: 255, unique: true })
  public loginId!: string

  @Column({ type: 'varchar', length: 255 })
  public name!: string

  @Column({ type: 'varchar', length: 255, select: false })
  public password!: string

  @Column({ type: 'enum', enum: Role })
  public role!: Role
}

export default User
