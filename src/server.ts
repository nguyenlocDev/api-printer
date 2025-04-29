import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { CONNECT_DB } from "./config/mongo.config";
import { API } from "./routes";
import { CONNECT_PT } from "./config/printer.config";
dotenv.config();
import cors from "cors";
// Khởi tạo ứng dụng Express
const app = express();
const PORT = process.env.APP_PORT || 3000;
const HOST = process.env.APP_HOST;

// Middleware để xử lý JSON
app.use(express.json());
app.use(cors());
// Route mặc định
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "API đang hoạt động!" });
});

const START_SERVER = () => {
  app.use(express.json());
  //route
  app.use("/api", API);

  app.listen(PORT as number, HOST as string, () => {
    console.log(`Hello , I am running at ${HOST}:${PORT}/`);
  });
};

// Khởi động server
(async () => {
  try {
    await CONNECT_DB();
    CONNECT_PT();
    console.log("connect to mongodb success");
    START_SERVER();
  } catch (error) {
    console.error(error);
    process.exit(0);
  }
})();
