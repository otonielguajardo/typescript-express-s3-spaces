require("dotenv").config();

import * as aws from "aws-sdk";
import { Request } from "express";
import * as multer from "multer";
import * as multerS3 from "multer-s3";

export const uploadMiddleware = multer({
  fileFilter: (req: Request, file, cb) => {
    // validate file
    console.log("file data", file);
    const isValid = true;
    cb(null, isValid);
    // cb(new Error("I don't have a clue!")); can also throw errors
  },
  storage: multerS3({
    s3: new aws.S3({
      accessKeyId: process.env.DO_SPACES_KEY || null,
      secretAccessKey: process.env.DO_SPACES_SECRET || null,
      endpoint: process.env.DO_SPACES_ENDPOINT || null,
      signatureVersion: "v4"
    }),
    bucket: process.env.DO_SPACES_BUCKET || null,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read",
    key: (req: Request, file, cb): any => {
      // save file to Spaces, you can use / to add folders directory
      const fileName = Date.now().toString(); //file.originalname;
      cb(null, `test/${fileName}`);
    }
  })
}).array("upload", 1);
