import { Entity, Column, OneToOne, JoinColumn, ManyToOne } from 'typeorm'

import Abstract from './Abstract'
import AreaMasterDetail from './AreaMasterDetail'
import Hotel from './Hotel'

@Entity('hotel_areas')
export class HotelArea extends Abstract {
  @ManyToOne(() => AreaMasterDetail)
  @JoinColumn({ name: 'area_master_detail_id' })
  public areaMasterDetail!: AreaMasterDetail

  @OneToOne(() => Hotel)
  @JoinColumn({ name: 'hotel_id' })
  public hotel!: Hotel
}

export default HotelArea
