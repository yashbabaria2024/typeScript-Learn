import express from 'express';
import authRouter from './authRouter';
import doctorRouter from './doctorRouter';
import adminRouter from './adminRouter';
// import patientRouter from './patientRouter';
import { getCityCombo, allSpecialities } from '../controllers/doctorController';
import { Request,Response } from "express";


const router = express.Router();
router.use("/", authRouter);
router.use("/doctor", doctorRouter);
router.use('/admin', adminRouter);
// router.use('/patient', patientRouter)

router.route("/cityCombo").get(getCityCombo);
router.route("/specialities").get(allSpecialities);

router.use("*",(req: Request,res:Response)=>{
  return res.render('common/404')
})

export default router;