export type orderCreationDto = {
    customerId: string,
    itemId:string,
    price:number,
    orderStatus: string,
}

export type orderUpdateDto = {
    orderId:string,
    customerId: string,
    itemId?:string,
    price:number,
    orderStatus: string,
}

export enum orderType {
    CREATE = "CREATE",
    UPDATE = "UPDATE",
}
  