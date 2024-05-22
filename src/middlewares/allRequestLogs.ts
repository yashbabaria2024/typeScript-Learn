import fs from 'fs';
import logger from '../utils/pino';
import { NextFunction, Request, Response } from 'express';

export const allRequestLogs = (req: Request, res: Response, next: NextFunction) => {
  try {

    let time = new Date().toLocaleString();

    // let fullURL = `${req.ip.split(':').pop()} ${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl} \n`;
    let fullURL = `${time} : ${req.method} : ${req.protocol}://${req.get('host')}${req.originalUrl} \n`;

    let fileName = 'uploads/requestLogs/requestURL.log';

    fs.appendFileSync(fileName, fullURL);
  } catch (error) {
    logger.error("some error in allRequestLogs.js middleware so create folder  : uploads/requestLogs");
  }

  next()
}