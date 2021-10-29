import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  UpdateDateColumn
} from 'typeorm'

@Entity()
export abstract class Abstract extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id?: number

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', precision: 0 })
  readonly createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', precision: 0 })
  readonly updatedAt!: Date

  @Column({ name: 'deleted_at', type: 'timestamp', precision: 0, nullable: true })
  public deletedAt?: Date | null
}

export default Abstract
