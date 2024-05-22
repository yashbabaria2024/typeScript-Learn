import multer from "multer";
import path from "path";
import { Request,Response } from "express";


// multer configuration
export const imgStorage = multer.diskStorage({
  destination: function (req:Request, file, cb) {
    cb(null, "./uploads/imgs/");
  },
  filename: function (req:Request, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

export const fileStorage = multer.diskStorage({
  destination: function (req:Request, file, cb) {
    cb(null, "./uploads/files/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

export const fileFilter = function (req:Request, file:Express.Multer.File, cb:Function) {
  const extension = path.extname(file.originalname).toLowerCase();
  // console.log(extension);
  const mimetyp = file.mimetype;
  if (extension !== ".pdf" || mimetyp !== "application/pdf") {
    return cb("error message", true);
  }
  cb(null, true);
};

export const imageFilter = function (req: Request, file: Express.Multer.File, cb:Function) {
  const extension = path.extname(file.originalname).toLowerCase();
  const mimetyp = file.mimetype;
  if (
    extension == ".jpg" ||
    extension == ".jpeg" ||
    extension == ".png" ||
    mimetyp == "image/png" ||
    mimetyp == "image/jpg" ||
    mimetyp == "image/jpeg"
  ) {
    return cb(null, true);
  }
  cb("error message img", true);
};
