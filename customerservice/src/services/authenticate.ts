import 'dotenv/config';
import bcrypt from 'bcrypt';
import { Request } from 'express';
import jwt from 'jsonwebtoken';
import { Customer } from '../models/customer.model';



const secret:string = process.env.secret!;

export const hashPassword = async (password: string) => {
    const saltRound = 12;
    const hash = await bcrypt.hash(password, saltRound);
    return hash;
};

export const comparePasswords = async (password: string, hashPassword: string) => {
    return await bcrypt.compare(password, hashPassword);
};

export const signedCustomerToken = async (customer: Customer) => {
    let token = jwt.sign(
        {customerId: customer.id},
        secret,
        {expiresIn: process.env.timeout}
    );
    return token
};

export const verifyCustomer = async (req: Request) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];
        try {
            let decoded: any = await jwt.verify(token, secret);
            return Customer.findByPk(decoded.customerId);
        } catch (error) {
            return null
        }
    } else {
        return null;
    }
}