import amqp from "amqplib/callback_api";
import { createOrder, updateOrder } from "./consumerHandler";

const orderConsumer = () => {
  amqp.connect("amqp://localhost:5672", function (error0, connection) {
    if (error0) {
      throw error0;
    }
    connection.createChannel(function (error1, channel) {
      if (error1) {
        throw error1;
      }

      const queue = "order_queue";

      channel.assertQueue(queue, {
        durable: false,
      });

      console.log(
        " [*] Waiting for messages in %s. To exit press CTRL+C",
        queue
      );

      channel.consume(
        queue,
        function (msg) {
          try {
            const payload = JSON.parse(msg!.content.toString());
            switch (payload.type.toLowerCase()) {
              case "create":
                createOrder(payload);
                break;
              case "update":
                updateOrder(payload);
                break;
              default:
                console.log("Message type not configured " + payload.type);
                break;
            }
            console.log(" [x] Received %s", msg!.content.toString());
            console.log(payload);
          } catch (err) {
            console.log(err);
          }
        },
        {
          noAck: true,
        }
      );
    });
  });
};

export default orderConsumer;
