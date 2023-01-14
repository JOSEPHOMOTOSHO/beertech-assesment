import { orderCreationDto, orderUpdateDto } from "./types";
import { Order } from "./models/order.model";


export const createOrder = async (orderData:orderCreationDto) => {
    let newOrder:orderCreationDto = orderData;
    let createdOrder = await Order.create(newOrder);
    return createdOrder;
}

export const updateOrder = async (orderData:orderUpdateDto) => {
   let orderId = orderData.orderId;
   let orderFound = await Order.findByPk(orderId);
   if(orderFound && orderFound.customerId === orderData.customerId && orderFound.id === orderData.orderId){
    await Order.update(orderData,{where:{id:orderId}});
   }
}