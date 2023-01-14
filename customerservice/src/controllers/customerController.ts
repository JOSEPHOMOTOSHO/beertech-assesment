import { RequestHandler } from "express";
import { Customer } from "../models/customer.model";
import { comparePasswords, hashPassword, signedCustomerToken } from "../services/authenticate";
import { customerCreationDto } from "../types";


export const createCustomer: RequestHandler = async (req, res) => {
    let newCustomer: customerCreationDto = req.body;
    if (newCustomer.name && newCustomer.password) {
        let hashedPassword = await hashPassword(newCustomer.password);
        newCustomer.password = hashedPassword;
        let createdCustomer = await Customer.create(newCustomer);
        res.status(201).json({
            username: createdCustomer.name,
            userId: createdCustomer.id
        });
    }
    else {
        res.status(400).send('Username and password required');
    }
};

export const loginCustomer: RequestHandler = async (req, res) => {
    let existingCustomer: Customer | null = await Customer.findOne({ 
        where: { name: req.body.name }
    });

    if (existingCustomer) {
        let passwordsMatch = await comparePasswords(req.body.password, existingCustomer.password);
        
        if (passwordsMatch) {
            let token = await signedCustomerToken(existingCustomer);
            res.status(200).json({ token, existingCustomer });
        }
        else {
            res.status(401).json('Invalid password');
        }
    }
    else {
        res.status(401).json('Invalid username');
    }
};
