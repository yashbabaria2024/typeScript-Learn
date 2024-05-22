import express from "express";
const router = express.Router();
import { imgStorage, imageFilter } from "../utils/multer";
import multer from "multer";
const imgUpload = multer({ storage: imgStorage, fileFilter: imageFilter });
import passport from "passport";
import { homePage, getCreateUserForm, createUser, getLoginForm, login, getCurrentUser, logout, generateToken, activationForm, activationAccount, forgotPassword, forgotPassLink, createPasswordForm, updatePassword, contactUsHomePage } from "../controllers/authController";

router.route("/").get(homePage);
router.route('/contact-message').post(contactUsHomePage)
// router.route("/alldoctors").get(getDoctorDetails); getDoctorDetails

router
  .route("/register")
  .get(getCreateUserForm)
  .post(imgUpload.single("profile"), createUser);

router.route("/login").get(getLoginForm).post(login);

router
  .route("/current-user")
  .get(
    passport.authenticate("jwt", { session: false, failureRedirect: "/login" }),
    getCurrentUser
  );

router
  .route("/logout")
  .post(
    passport.authenticate("jwt", { session: false, failureRedirect: "/login" }),
    logout
  );

router.route("/generatetoken").post(generateToken);

router.route("/account-activation").get(activationForm);

router.route("/activate").get(activationAccount);

router.route("/forgot-password").get(forgotPassword).post(forgotPassLink);

router.route("/forgot").get(createPasswordForm);

router.route("/forgot/change-password").post(updatePassword);


export default router