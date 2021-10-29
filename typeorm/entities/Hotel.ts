import { Entity, Column, OneToMany, OneToOne } from 'typeorm'

import Abstract from './Abstract'
import Availability from './Availability'
import HotelArea from './HotelArea'
import Price from './Price'

@Entity('hotels')
export class Hotel extends Abstract {
  @Column({ type: 'varchar', length: 255 })
  public name!: string

  @Column({ type: 'varchar', length: 255 })
  public address!: string

  @Column({ type: 'varchar', length: 20 })
  public phone!: string

  @Column({ type: 'varchar', length: 50 })
  public mapcode!: string

  @Column({ type: 'varchar', length: 50, nullable: true })
  public lat?: string

  @Column({ type: 'varchar', length: 50, nullable: true })
  public lon?: string

  @Column({ name: 'credit_card', type: 'boolean', default: false })
  public creditCard!: boolean

  @Column({ type: 'varchar', length: 255, nullable: true })
  public website?: string | null

  @OneToMany(
    () => Price,
    prices => prices.hotel
  )
  prices?: Price[]

  @OneToOne(
    () => Availability,
    availability => availability.hotel
  )
  availability?: Availability

  @OneToOne(
    () => HotelArea,
    hotelArea => hotelArea.hotel
  )
  hotelArea?: HotelArea
}

export default Hotel
