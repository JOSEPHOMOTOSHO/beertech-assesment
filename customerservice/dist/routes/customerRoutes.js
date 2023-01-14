"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const customerController_1 = require("../controllers/customerController");
const router = (0, express_1.Router)();
router.post('/', customerController_1.createCustomer);
router.post('/login', customerController_1.loginCustomer);
exports.default = router;
