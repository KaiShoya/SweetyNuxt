import { Entity, Column, JoinColumn, OneToOne } from 'typeorm'

import Abstract from './Abstract'
import Hotel from './Hotel'

@Entity('availabilities')
export class Availability extends Abstract {
  @OneToOne(type => Hotel, {
    cascade: true
  })
  @JoinColumn()
  public hotel!: Hotel

  @Column()
  public availability!: boolean

  @Column({ name: 'room_count' })
  public roomCount!: number
}

export default Availability
