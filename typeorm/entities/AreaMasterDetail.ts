import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm'

import Abstract from './Abstract'
import AreaMaster from './AreaMaster'
import HotelArea from './HotelArea'

@Entity('area_master_details')
export class AreaMasterDetail extends Abstract {
  @ManyToOne(type => AreaMaster, {
    cascade: true
  })
  @JoinColumn()
  public areaMaster!: AreaMaster

  @Column({ type: 'varchar', length: 255 })
  public name!: string

  @OneToMany(
    type => HotelArea,
    hotelArea => hotelArea.areaMasterDetail
  )
  hotelArea?: HotelArea[]
}

export default AreaMasterDetail
