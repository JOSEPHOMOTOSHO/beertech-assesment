"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const callback_api_1 = __importDefault(require("amqplib/callback_api"));
const publishOrder = (order) => {
    callback_api_1.default.connect('amqp://localhost', function (error0, connection) {
        if (error0)
            throw error0;
        connection.createChannel(function (error1, channel) {
            if (error1)
                throw error1;
            const queue = 'order_queue';
            const msg = JSON.stringify(order);
            channel.assertQueue(queue, {
                durable: false,
            });
            channel.sendToQueue(queue, Buffer.from(msg));
            console.log(' [x] Sent %s', msg);
        });
        setTimeout(function () {
            connection.close();
            // process.exit(0)
        }, 500);
    });
};
exports.default = publishOrder;
