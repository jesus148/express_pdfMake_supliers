

import { Router } from "express";
import { getAccountState } from "../controllers/excel.controller";

const router = Router();


// router.get()



router.get('/account-state',getAccountState );





export default router;