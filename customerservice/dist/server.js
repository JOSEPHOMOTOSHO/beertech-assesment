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
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const customerRoutes_1 = __importDefault(require("./routes/customerRoutes"));
const db_1 = __importDefault(require("./config/db"));
const app = (0, express_1.default)();
const port = 3000;
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:3001'
};
app.use(cors(corsOptions));
//Routes Go Below:
app.use('/api/customers', customerRoutes_1.default);
app.use('/api/orders', customerRoutes_1.default);
app.use((req, res, next) => {
    res.status(404).end();
});
/** Create HTTP server. */
const server = http_1.default.createServer(app);
/** Listen on provided port, on all network interfaces. */
server.listen(3000);
/** Event listener for HTTP server "listening" event. */
server.on('listening', () => {
    db_1.default.authenticate().then(() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield db_1.default.sync({ force: true });
        }
        catch (err) {
            console.error(err.message);
        }
    }));
    console.log(`Listening on port:: http://localhost:${port}/`);
});
