"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const customer_model_1 = require("../models/customer.model");
const sequelize = new sequelize_typescript_1.Sequelize('customer_db', 'root', 'admin', {
    dialect: 'mysql',
});
sequelize.addModels([customer_model_1.Customer]);
exports.default = sequelize;
