import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm'

import Abstract from './Abstract'
import AreaMaster from './AreaMaster'
import HotelArea from './HotelArea'

@Entity('area_master_details')
export class AreaMasterDetail extends Abstract {
  @ManyToOne(() => AreaMaster, areaMaster => areaMaster.areaMasterDetail)
  @JoinColumn({ name: 'area_master_id' })
  public areaMaster!: AreaMaster

  @Column({ type: 'varchar', length: 255 })
  public name!: string

  @OneToMany(
    () => HotelArea,
    hotelArea => hotelArea.areaMasterDetail
  )
  hotelArea?: HotelArea[]
}

export default AreaMasterDetail
