"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginCustomer = exports.createCustomer = void 0;
const customer_model_1 = require("../models/customer.model");
const authenticate_1 = require("../services/authenticate");
const createCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let newCustomer = req.body;
    if (newCustomer.name && newCustomer.password) {
        let hashedPassword = yield (0, authenticate_1.hashPassword)(newCustomer.password);
        newCustomer.password = hashedPassword;
        let createdCustomer = yield customer_model_1.Customer.create(newCustomer);
        res.status(201).json({
            username: createdCustomer.name,
            userId: createdCustomer.id
        });
    }
    else {
        res.status(400).send('Username and password required');
    }
});
exports.createCustomer = createCustomer;
const loginCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let existingCustomer = yield customer_model_1.Customer.findOne({
        where: { name: req.body.name }
    });
    if (existingCustomer) {
        let passwordsMatch = yield (0, authenticate_1.comparePasswords)(req.body.password, existingCustomer.password);
        if (passwordsMatch) {
            let token = yield (0, authenticate_1.signedCustomerToken)(existingCustomer);
            res.status(200).json({ token, existingCustomer });
        }
        else {
            res.status(401).json('Invalid password');
        }
    }
    else {
        res.status(401).json('Invalid username');
    }
});
exports.loginCustomer = loginCustomer;
