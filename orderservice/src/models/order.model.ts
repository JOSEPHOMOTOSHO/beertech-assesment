import {
    Table,
    Column,
    Model,
    AllowNull,
    PrimaryKey,
    IsUUID,
    CreatedAt,
    UpdatedAt
  } from 'sequelize-typescript'
  import { DataTypes } from 'sequelize'
  import { orderCreationDto } from '../types'
  
  @Table
  export class Order extends Model implements orderCreationDto {
    @IsUUID(4)
    @PrimaryKey
    @Column({ defaultValue: DataTypes.UUIDV4 })
    id?: string

    @AllowNull(false)
    @IsUUID(4)
    @Column({ defaultValue: DataTypes.UUIDV4 })
    itemId!: string

    @AllowNull(false)
    @Column
    customerId!: string
  
    @AllowNull(false)
    @Column
    price!: number
  
    @AllowNull(false)
    @Column({ defaultValue: "placed" })
    @Column
    orderStatus!: string

    @CreatedAt
    createdAt?:Date

    @UpdatedAt
    updatedAt?:Date
  }
  