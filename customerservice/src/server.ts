import http from "http";
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import customerRoutes from "./routes/customerRoutes";
import orderRoutes from "./routes/orderRoutes";
import sequelize from "./config/db";

const app = express();

const port = 3001;

app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:3001",
};
app.use(cors(corsOptions));

//Routes Go Below:
app.use("/api/customers", customerRoutes);
app.use("/api/orders", orderRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).end();
});

/** Create HTTP server. */
const server = http.createServer(app);
/** Listen on provided port, on all network interfaces. */
server.listen(port);

/** Event listener for HTTP server "listening" event. */
server.on("listening", () => {
  sequelize.authenticate().then(async () => {
    try {
      await sequelize.sync({ force: false });
    } catch (err: any) {
      console.error(err.message);
    }
  });

  console.log(`Listening on port:: http://localhost:${port}/`);
});
