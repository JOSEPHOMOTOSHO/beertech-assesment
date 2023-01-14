import { RequestHandler } from "express";
import { Customer } from "../models/customer.model";
import { verifyCustomer } from "../services/authenticate";
import { orderCreationDto, orderType, orderUpdateDto } from "../types";
import publishOrder from "../utils/publisher";

export const createOrder: RequestHandler = async (req,res) => {
    try{
        let customer: Customer | null = await verifyCustomer(req);

        if (!customer) {
            return res.status(403).send();
        }

        let newOrder: orderCreationDto = {
            customerId: customer.id!,
            price:req.body.price,
            orderStatus:req.body.orderStatus,
            type: orderType.CREATE
        };

        await publishOrder(newOrder);

    }catch(err){
        throw err
    }
};



export const updateOrder: RequestHandler = async (req,res) => {

    let customer:Customer | null = await verifyCustomer(req);

    if (!customer) {
        return res.status(403).send();
    }

    let orderId = req.params.orderId;
    let newOrder:orderUpdateDto = {
        orderId,
        customerId: customer.id!,
        price:req.body.price,
        orderStatus:req.body.orderStatus,
        type: orderType.UPDATE
    }

     await publishOrder(newOrder);
};
