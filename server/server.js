import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import apiRoutes from "./routes/transactionsRoutes.js";
import mongoConnect from "./db/db.js";
import { initDb } from "./controllers/transactionController.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", apiRoutes);

const PORT = process.env.PORT || 5000;

mongoConnect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
    initDb();
  })
  .catch((err) => console.log(err));
