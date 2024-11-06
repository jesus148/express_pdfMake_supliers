

import { Router } from "express";
import {  getAccountState , getBankAccount, getdeductions, getPayedInvoices, getwithholdings } from "../controllers/excel.controller";

const router = Router();


// router.get()






// estado cuenta 
// http://localhost:3000/api/supliers/account-state/P20600987381
router.get('/account-state/:cardCode',getAccountState );


// detracciones 
// http://localhost:3000/api/supliers/deductions/P20600987381
router.get('/deductions/:cardCode' , getdeductions);


// retenciones
// http://localhost:3000/api/supliers/withholdings/P20600987381
router.get('/withholdings/:cardCode' , getwithholdings);


// pagos efectuados
// http://localhost:3000/api/supliers/payed-invoices/P20600987381
router.get('/payed-invoices/:cardCode' , getPayedInvoices);


// cuentas de banco
// http://localhost:3000/api/supliers/bank-account/P20600987381
router.get('/bank-account/:cardCode' , getBankAccount);

export default router;