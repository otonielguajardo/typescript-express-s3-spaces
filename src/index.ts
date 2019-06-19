import "reflect-metadata";
require("dotenv").config();

import * as express from "express";
import { Request, Response } from "express";
import * as bodyParser from "body-parser";
import * as helmet from "helmet";
import * as cors from "cors";
import * as path from "path";

// DigitalOcean Spaces uploader ======================================== !!

import { uploadMiddleware } from "./uploadMiddleware";

// Main declarations =================================================== !!

const port = process.env.PORT || 3000;
const app: express.Application = express();

// Middleware ========================================================== !!

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

// Routes ============================================================== !!

app.use("/", express.static(path.join(__dirname, "./..", "public")));

app.get("/test", (req: Request, res: Response) => {
  return res.json("All good.");
});

app.post("/upload", uploadMiddleware, (req: Request, res: Response) => {
  const uploadData = {
    timestamp: Date.now().toString(),
    files: req.files
  };
  console.log(uploadData);
  res.json(uploadData);
});

// Start Server ======================================================== !!

app.listen(port, function() {
  console.log(`Server listening on port http://localhost:${port}`);
});
