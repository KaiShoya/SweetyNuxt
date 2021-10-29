import { Entity, Column, JoinColumn, OneToOne } from 'typeorm'

import Abstract from './Abstract'
import Hotel from './Hotel'

@Entity('availabilities')
export class Availability extends Abstract {
  @OneToOne(() => Hotel)
  @JoinColumn({ name: 'hotel_id' })
  public hotel!: Hotel

  @Column({ type: 'boolean', nullable: true })
  public availability?: boolean | null

  @Column({ name: 'room_count' })
  public roomCount!: number
}

export default Availability
