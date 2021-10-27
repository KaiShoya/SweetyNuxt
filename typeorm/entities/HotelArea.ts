import { Entity, Column, OneToOne, JoinColumn, ManyToOne } from 'typeorm'

import Abstract from './Abstract'
import AreaMasterDetail from './AreaMasterDetail'
import Hotel from './Hotel'

@Entity('hotel_areas')
export class HotelArea extends Abstract {
  @ManyToOne(type => AreaMasterDetail, {
    cascade: true
  })
  @JoinColumn()
  public areaMasterDetail!: AreaMasterDetail

  @OneToOne(type => Hotel, {
    cascade: true
  })
  @JoinColumn()
  public hotel!: Hotel

  @Column({ type: 'varchar', length: 255 })
  public name!: string
}

export default HotelArea
