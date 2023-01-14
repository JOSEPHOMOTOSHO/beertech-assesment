import { Sequelize } from 'sequelize-typescript'
import { Customer } from '../models/customer.model'

const sequelize = new Sequelize('customer_db', 'root', 'admin', {
  dialect: 'mysql',
})

sequelize.addModels([Customer])

export default sequelize
