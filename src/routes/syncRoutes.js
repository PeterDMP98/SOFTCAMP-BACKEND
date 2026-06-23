import { Router } from "express";
import { authenticateToken } from "../middleware/authMiddleware.js";
import { pushSync, pullSync, syncStatus } from "../controllers/syncController.js";

const router = Router();

router.use(authenticateToken);

router.post("/push", pushSync);
router.get("/pull", pullSync);
router.get("/status", syncStatus);

export default router;
