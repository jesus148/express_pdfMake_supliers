

import {Response , Request} from 'express';
import ExcelJS, { Workbook } from 'exceljs';
import exceljs from 'exceljs'
import fs from 'fs';
import path from 'path';



export const getAccountState= async( req:Request, resp:Response)=>{
    
    const rutaExcel = path.join(__dirname, '..','src' );
    resp.json({
        msg: rutaExcel
    })
}




export const getMethodoExcel= async( req:Request, resp:Response)=>{


  const cardCode = req.params.cardCode;


  const apiUrl='http://52.207.189.125:3000';
  const response = await fetch(`${apiUrl}/account-state?cardCode=${cardCode}`);
  const data= await response.json();



  // const reportPath = path.join(__dirname, '..', 'report', 'report.xlsx');
  //   // existe un arcivo en la ruta indicada fs.existsSync(reportPath)
  //   if (fs.existsSync(reportPath)) {
  //     // si existe lo lo elimina 
  //     fs.unlinkSync(reportPath);
  // }


   
let workbook = new exceljs.Workbook();
let worksheet = workbook.addWorksheet("Tutorials"); 


worksheet.columns = [
  { header: "SERIE_CORREL", key: "correl", width: 10 },
  { header: "Fec_Emision", key: "emision", width: 20 },
  { header: "Fec_VCTO", key: "vencimiento", width: 25 },
  { header: "Fec_Programacion", key: "programacion", width: 5 },
  { header: "Moneda", key: "moneda", width: 5 },
  { header: "Total_Documento", key: "total", width: 10 },
  { header: "Monto_pagado", key: "monto", width: 10 },
  { header: "Saldo_pendiente", key: "saldo", width: 10 },
];


// const User = [
//     {
//      fname: "John",
//      lname: "Doe",
//      email: "john.doe@example.com",
//      gender: "Male",
//     },
//     {
//      fname: "Jane",
//      lname: "Doe",
//      email: "jane.doe@example.com",
//      gender: "Female",
//     },
//     {
//      fname: "Bob",
//      lname: "Smith",
//      email: "bob.smith@example.com",
//      gender: "Male",
//     },
//   ];
  


data.rows.forEach( (item:any)=>{
 const row = worksheet.addRow({
    correl:item.SERIE_CORREL,
    emision:item.Fec_Emision,
    vencimiento:item.Fec_VCTO,
    programacion:item.Fec_Programacion,
    moneda:item.Moneda,
    total:item.Total_Documento,
    monto:item.Monto_pagado,
    saldo:item.Saldo_pendiente
  })

  const montoCell = row.getCell('monto');
  montoCell.numFmt = '#,##0.00';



  
})


resp.setHeader(
  "Content-Type",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
);
resp.setHeader(
  "Content-Disposition",
  "attachment; filename=" + "tutorials.xlsx"
);

await workbook.xlsx.write(resp);
resp.end();

}