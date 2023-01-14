export type customerCreationDto = {
    name:string,
    email: string
    password: string
}


export type orderCreationDto = {
    customerId: string,
    itemId?:string,
    price:number,
    orderStatus: string,
    type: orderType
}

export type orderUpdateDto = {
    orderId:string,
    customerId: string,
    itemId?:string,
    price:number,
    orderStatus: string,
    type: orderType
}

export enum orderType {
    CREATE = "CREATE",
    UPDATE = "UPDATE",
}
  