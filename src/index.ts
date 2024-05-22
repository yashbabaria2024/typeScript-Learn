import express from "express";
import cookieParser from "cookie-parser";
const app = express();
import { Server } from "socket.io";
import path from "path";
import fs from 'fs';
import logger from "./utils/pino";
require("dotenv").config();

const PORT = process.env.PORT;

// passport configuration
import passport from "passport";
import { passportConfig } from "./middlewares/authMiddleware";
passportConfig(passport);

// server is running on PORT
const server = app.listen(PORT, () => {
  logger.info(`server is running on port: http://localhost:${PORT}`);
});

const io = new Server(server);

import { generatePDF } from "./controllers/pdfController";

// socket initialization
io.on("connection", (socket) => {

  let req = socket.handshake;
  let url = req.headers.referer;
  let time = new Date(req.time).toLocaleString();
  let fullURL = `${time} : SOCKET :  ${url} \n`;

  let fileName = `uploads/requestLogs/requestURL.log`;

  fs.appendFileSync(fileName, fullURL);

  let result: Array<{ email?: string }>
  socket.on("reminder", async (userEmail) => {
    try {
      [result] = await conn.query<RowDataPacket[]>(
        `select u.email,n.* from notifications as n inner join users as u on u.id = n.user_id where timestampdiff(minute,n.start_at,utc_timestamp) between 0 and 120 and status=0`
      ) as Array<Array<{ email?: string }>>

    } catch (error) {
      logger.error(error);
      // console.log(error);
    }

    result.forEach((data) => {
      console.log(data);
      socket.emit(`reminder-${data.email}`, data);
    });
  });

  socket.on("notification", async (user) => {
    let [data] = await conn.query<RowDataPacket[]>(
      `select * from notifications where user_id = ? and (date(end_at)= curdate() or 
    timestampdiff(second,utc_timestamp,end_at)>0)`,
      [user.id]
    );
    socket.emit(`notification-${user.email}`, data.sort((a, b) => new Date(b.end_at).getTime() - new Date(a.end_at).getTime()));
  });

  socket.on("delete-slot", (msg) => {
    msg ? io.emit(`delete-slot-${msg.patient_id}`, msg) : 0;
  });

  socket.on("cancel-slot", (msg) => {
    msg ? io.emit(`cancel-slot-${msg.doctor_id}`, msg) : 0;
  });

  // user req for change slot
  socket.on("changeslot", () => {
    socket.broadcast.emit("madechanges");
  });

  socket.emit("connectmsg", "thank you for connecting");

  socket.on("cancel-slot", (msg) => {
    msg ? io.emit(`cancel-slot-${msg.doctor_id}`, msg) : 0;
  });

  socket.on('generatePDF', async (id) => {
    try {
      const filename = await generatePDF(id);
      socket.emit('pdfready', filename);
    }
    catch (error) {
      logger.error(error);
    }
  });

  socket.on("downloadPDF", async (filename) => {
    try {
      if (fs.existsSync(`uploads/pdfs/${filename}`)) {
        const file = fs.readFileSync(`uploads/pdfs/${filename}`);
        socket.emit("pdfFile", { filename, file });
      }
    } catch (error) {
      logger.error("error in downloading PDF", error);
    }
  });

  socket.on("deletePDF", (filename) => {
    try {
      if (fs.existsSync(`uploads/pdfs/${filename}`)) {
        const file = fs.unlinkSync(`uploads/pdfs/${filename}`);
      }
    } catch (error) {
      // console.log("error in deleting pdf", error);
      logger.error("error in deleting pdf", error);
    }
  });

  socket.on("disconnect", () => {
    // console.log("A user disconnected");
  });
});

// set view engine
app.set("view engine", "ejs");
app.set("views", "./views");

// setup static file path for css,imgs,js or other files
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.static(path.join(__dirname, "/uploads")));
app.use(
  "/sweetalert2",
  express.static(path.join(__dirname, "/node_modules/sweetalert2/dist"))
);
app.use(
  "/sweetalert2",
  express.static("/node_modules/sweetalert2/dist"));
// middleware
app.use(passport.initialize());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// use root router in index file
import rootRouter from "./routes/rootRouter";
import { allRequestLogs } from "./middlewares/allRequestLogs";
import conn from "./config/dbConnection";
import { RowDataPacket } from "mysql2";

app.use("/", allRequestLogs, rootRouter);
