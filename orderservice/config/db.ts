import { Sequelize } from 'sequelize-typescript'
import { Order } from '../models/order.model'

const sequelize = new Sequelize('order_db', 'root', 'admin', {
  dialect: 'mysql',
})

sequelize.addModels([Order])

export default sequelize
