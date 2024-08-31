import { Router } from "express";
import controller from "../controllers/user";

const router = Router();

router.route("/signup").post(controller.signup);
router.route("/signin").post(controller.signin);
router.route("/logout").delete(controller.logout);
router.route("/account").delete(controller.delete);
router.route("/profile").get(controller.fetchUser);

export default router;
