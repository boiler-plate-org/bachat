import { Router } from "express";
import middlware from "../middlewares/user";
import controller from "../controllers/account";

const router = Router();

router.use(middlware);

router.route("/limit").put(controller.changeLimit);
router.route("/balance").put(controller.changeBalance);
router.route("/web3/balance/:address").get(controller.fetchWeb3Balance);
router.route("//profile").get(controller.fetchAccount);

export default router;
