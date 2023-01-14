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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrder = exports.createOrder = void 0;
const authenticate_1 = require("../services/authenticate");
const types_1 = require("../types");
const publisher_1 = __importDefault(require("../utils/publisher"));
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let customer = yield (0, authenticate_1.verifyCustomer)(req);
        if (!customer) {
            return res.status(403).send();
        }
        let newOrder = {
            customerId: customer.id,
            price: req.body.price,
            orderStatus: req.body.orderStatus,
            type: types_1.orderType.CREATE
        };
        yield (0, publisher_1.default)(newOrder);
    }
    catch (err) {
        throw err;
    }
});
exports.createOrder = createOrder;
const updateOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let customer = yield (0, authenticate_1.verifyCustomer)(req);
    if (!customer) {
        return res.status(403).send();
    }
    let orderId = req.params.orderId;
    let newOrder = {
        orderId,
        customerId: customer.id,
        price: req.body.price,
        orderStatus: req.body.orderStatus,
        type: types_1.orderType.UPDATE
    };
    yield (0, publisher_1.default)(newOrder);
});
exports.updateOrder = updateOrder;
