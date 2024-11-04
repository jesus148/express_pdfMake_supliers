

import { Router } from "express";
import { getAccountState, getMethodoExcel } from "../controllers/excel.controller";

const router = Router();


// router.get()



router.get('/account-state',getAccountState );


// http://localhost:3000/api/supliers/excel-example/P20600987381
router.get('/excel-example/:cardCode',getMethodoExcel );





export default router;