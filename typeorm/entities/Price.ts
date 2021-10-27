import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm'
import { IPostgresInterval } from 'postgres-interval'

import Abstract from './Abstract'
import Hotel from './Hotel'

import DayOfWeek from '../enum/DayOfWeek'

@Entity('prices')
export class Price extends Abstract {
  @ManyToOne(type => Hotel, {
    cascade: true
  })
  @JoinColumn()
  public hotel!: Hotel

  @Column({ name: 'day_of_week', type: 'enum', enum: DayOfWeek })
  public dayOfWeek!: DayOfWeek

  @Column({ name: 'min_price' })
  public minPrice!: number

  @Column({ name: 'max_price' })
  public maxPrice!: number

  // FIXME: interval hour to minuteにしたい
  @Column({ name: 'time_zone_start', type: 'interval' })
  public timeZoneStart!: IPostgresInterval

  // FIXME: interval hour to minuteにしたい
  @Column({ name: 'time_zone_end', type: 'interval' })
  public timeZoneEnd!: IPostgresInterval

  @Column({ name: 'utilization_time', type: 'varchar', length: 255 })
  public utilizationTime!: string

  @Column({ name: 'from_checkin' })
  public fromCheckin!: boolean
}

export default Price
