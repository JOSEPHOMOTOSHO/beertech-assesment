import amqp from 'amqplib/callback_api'
import { orderCreationDto } from '../types'

const publishOrder: (arg0: any) => any = (order: orderCreationDto) => {
  amqp.connect('amqp://localhost:5672', function (error0, connection) {
    if (error0) throw error0

    connection.createChannel(function (error1, channel) {
      if (error1) throw error1

      const queue = 'order_queue'
      const msg = JSON.stringify(order)

      channel.assertQueue(queue, {
        durable: false,
      })

      channel.sendToQueue(queue, Buffer.from(msg))
      console.log(' [x] Sent %s', msg)
    })
    setTimeout(function () {
      connection.close()
      // process.exit(0)
    }, 500)
  })
}
export default publishOrder
