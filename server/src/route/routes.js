
import express from "express";
import SignUp from "../controller/signup.controller.js";
import signIn_middleware from "../middleware/signIn.middleware.js";
import signIn from "../controller/signin.controller.js";
import sendEmail from "../utils/nodeMailer.js"
import upload_controller from "../controller/upload.controller.js";
import showFiles from "../controller/showFiles.controller.js";
import downloadFiles from "../controller/downloadFiles.js";
import exchangeFile_viaEmail from "../controller/sendEmail.controller.js";
const route = express.Router()


route.post("/user/signup",SignUp);
route.post("/user/signin",signIn_middleware,signIn);
route.post("/user/mail",sendEmail);
route.post("/user/upload",upload_controller);
route.post("/send",exchangeFile_viaEmail)

route.get('/files/:uuid',showFiles);
route.get("/files/download/:uuid",downloadFiles);

export default route;