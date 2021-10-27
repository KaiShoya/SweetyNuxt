import { Entity, Column, OneToMany } from 'typeorm'

import Abstract from './Abstract'
import AreaMasterDetail from './AreaMasterDetail'

@Entity('area_masters')
export class AreaMaster extends Abstract {
  @Column({ type: 'varchar', length: 255 })
  public name!: string

  @OneToMany(
    type => AreaMasterDetail,
    areaMasterDetail => areaMasterDetail.areaMaster
  )
  areaMasterDetail?: AreaMasterDetail[]
}

export default AreaMaster
