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
  import { customerCreationDto } from '../types'
  
  @Table
  export class Customer extends Model implements customerCreationDto {
    @IsUUID(4)
    @PrimaryKey
    @Column({ defaultValue: DataTypes.UUIDV4 })
    id?: string

    @AllowNull(false)
    @Column
    name!: string
  
    @AllowNull(false)
    @Column
    email!: string
  
    @AllowNull(false)
    @Column
    password!: string

    @CreatedAt
    createdAt?:Date

    @UpdatedAt
    updatedAt?:Date
  }
  