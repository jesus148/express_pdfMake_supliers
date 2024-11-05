

import {Response , Request} from 'express';
import ExcelJS, { Workbook } from 'exceljs';
import exceljs from 'exceljs'
import fs from 'fs';
import path from 'path';
import moment from 'moment';
import { format} from 'numfmt';






// estado de cuenta
// http://localhost:3000/api/supliers/account-state/P20600987381
export const getAccountState = async( req:Request, resp:Response)=>{


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
let worksheet = workbook.addWorksheet("Estado_Cuenta" , {properties:{tabColor:{argb:'23'}}}); 


worksheet.columns = [
  { header: "Serie_Correl", key: "correl", width: 15  },
  { header: "Fec_Emision", key: "emision", width: 15  },
  { header: "Fec_Vco", key: "vencimiento", width: 15  },
  { header: "Moneda", key: "moneda", width: 10  },
  { header: "Total_Documento", key: "total", width: 18  },
  { header: "Monto_pagado", key: "monto", width: 15   },
  { header: "Saldo_pendiente", key: "saldo", width: 15 },
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
    moneda:item.Moneda,
    total:Number(item.Total_Documento),
    monto: Number(item.Monto_pagado),
    saldo:Number(item.Saldo_pendiente)
  })

  row.getCell("vencimiento").value = moment().format("MM/DD/YYYY");
  row.getCell("emision").value = moment().format("MM/DD/YYYY");


  const correl= row.getCell('correl').alignment={vertical:'middle',horizontal:'center'}
  const emision= row.getCell('emision').alignment={vertical:'middle',horizontal:'center'}
  const vencimiento= row.getCell('moneda').alignment={vertical:'middle',horizontal:'center'}
  const moneda= row.getCell('vencimiento').alignment={vertical:'middle',horizontal:'center'}


  const total= row.getCell("total");
  total.numFmt = "$ #,##0.000";
  

  const saldo = row.getCell("saldo");
  saldo.numFmt = "$ #,##0.000";
})




resp.setHeader(
  "Content-Type",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
);
resp.setHeader(
  "Content-Disposition",
  "attachment; filename=" + "report.xlsx"
);

await workbook.xlsx.write(resp);
resp.end();

}








// DETRACCIONES 
// http://localhost:3000/api/supliers/deductions/P20600987381
export const getdeductions= async( req:Request, resp:Response)=>{

  const cardCode = req.params.cardCode;


  const apiUrl='http://52.207.189.125:3000';
  const response = await fetch(`${apiUrl}/deductions?cardCode=${cardCode}`);
  const data= await response.json();



  const workbook = new ExcelJS.Workbook();
  const sheet= workbook.addWorksheet('Deducciones');

  

  sheet.columns = [
  { header: "Sunat", key: "sunat", width: 13 },
  { header: "Emisión", key: "emision", width: 15  },
  { header: "Fec_Pago", key: "fec_pago", width: 15  },
  { header: "Moneda", key: "moneda", width: 10  },
  { header: "total", key: "total", width: 15  },
  { header: "Detracción", key: "detraccion", width: 18  }
];

sheet.getColumn(1).alignment={vertical:'middle',horizontal:'center'}
sheet.getColumn(2).alignment={vertical:'middle',horizontal:'center'}
sheet.getColumn(3).alignment={vertical:'middle',horizontal:'center'}
sheet.getColumn(4).alignment={vertical:'middle',horizontal:'center'}
sheet.getColumn(5).alignment={vertical:'middle',horizontal:'center'}
sheet.getColumn(6).alignment={vertical:'middle',horizontal:'center'}



data.rows.forEach( (item:any)=>{
  const row = sheet.addRow({
    sunat:item.Sunat,
    emision:item.Emision,
    fec_pago:item.Vencimiento,
    moneda:item.Moneda,
    total:Number(item.Total),
    detraccion: Number(item.Detraccion),
   })

   row.getCell("emision").value = moment().format("MM/DD/YYYY");
   row.getCell("fec_pago").value = moment().format("MM/DD/YYYY");

   
  const sunat= row.getCell('sunat').alignment={vertical:'middle',horizontal:'center'}
  const emision= row.getCell('emision').alignment={vertical:'middle',horizontal:'center'}
  const fec_pago= row.getCell('fec_pago').alignment={vertical:'middle',horizontal:'center'}
  const moneda= row.getCell('moneda').alignment={vertical:'middle',horizontal:'center'}



  const total= row.getCell("total");
  total.numFmt = "$ #,##0.000";

  const detraccion= row.getCell("detraccion");
  detraccion.numFmt = "$ #,##0.000";

 })



 resp.setHeader(
  "Content-Type",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
);
resp.setHeader(
  "Content-Disposition",
  "attachment; filename=" + "report.xlsx"
);

await workbook.xlsx.write(resp);
resp.end();



}













// metodo retenciones
// http://localhost:3000/api/supliers/withholdings/P20600987381
export const getwithholdings= async( req:Request, resp:Response)=>{
  const cardCode = req.params.cardCode;


  const apiUrl='http://52.207.189.125:3000';
  const response = await fetch(`${apiUrl}/withholdings?cardCode=${cardCode}`);
  const data= await response.json();


  const workbook = new ExcelJS.Workbook();
  const sheet= workbook.addWorksheet('Retenciones');


  
  sheet.columns = [
    { header: "Serie_Correlativo", key: "serie", width: 18 },
    { header: "Fec_Emi", key: "emision", width: 15  },
    { header: "Mo_Fac", key: "mofac", width: 12  },
    { header: "Total_Fact", key: "totalfac", width: 15  },
    { header: "Compret", key: "compret", width: 15  },
    { header: "Fec_Reten", key: "fec_Rete", width: 18  },
    { header: "Mo_Pag", key: "Mo_pag", width: 15  },
    { header: "Retenido", key: "Retenido", width: 18  }
  ];

  
sheet.getColumn(1).alignment={vertical:'middle',horizontal:'center'}
sheet.getColumn(2).alignment={vertical:'middle',horizontal:'center'}
sheet.getColumn(3).alignment={vertical:'middle',horizontal:'center'}
sheet.getColumn(5).alignment={vertical:'middle',horizontal:'center'}
sheet.getColumn(6).alignment={vertical:'middle',horizontal:'center'}
sheet.getColumn(7).alignment={vertical:'middle',horizontal:'center'}


data.rows.forEach( (item:any)=>{
  const row = sheet.addRow({
    serie:item.SERIE_CORRELATIVO,
    emision:item.FEC_EMI_FACT,
    mofac:item.MONEDA_PAGO,
    totalfac: Number(item.TOTAL_FACT),
    compret:item.COMPRET, 
    fec_Rete:item.FECHA_RETENCION,
    Mo_pag:item.MONEDA_PAGO,
    Retenido:Number(item.RETENIDO)
   })

   row.getCell("emision").value = moment().format("MM/DD/YYYY");
   row.getCell("fec_Rete").value = moment().format("MM/DD/YYYY");

   
  // const sunat= row.getCell('sunat').alignment={vertical:'middle',horizontal:'center'}
  // const emision= row.getCell('emision').alignment={vertical:'middle',horizontal:'center'}
  // const fec_pago= row.getCell('fec_pago').alignment={vertical:'middle',horizontal:'center'}
  // const moneda= row.getCell('moneda').alignment={vertical:'middle',horizontal:'center'}



  const totalfac= row.getCell("totalfac");
  totalfac.numFmt = "$ #,##0.000";

  const Retenido= row.getCell("Retenido");
  Retenido.numFmt = "$ #,##0.000";

 })



 resp.setHeader(
  "Content-Type",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
);
resp.setHeader(
  "Content-Disposition",
  "attachment; filename=" + "report.xlsx"
);

await workbook.xlsx.write(resp);
resp.end();

}







// pagos efectuados
// ttp://localhost:3000/api/supliers/payed-invoices/P20600987381
export const getPayedInvoices= async( req:Request, resp:Response)=>{
  const cardCode = req.params.cardCode;


  const apiUrl='http://52.207.189.125:3000';
  const response = await fetch(`${apiUrl}/payed-invoices?cardCode=${cardCode}`);
  const data= await response.json();
  console.log(data)

  const workbook = new ExcelJS.Workbook();
  const sheet= workbook.addWorksheet('PagosEfectuados');

  
  sheet.columns = [
    { header: "Serie_Correl", key: "serie", width: 15  },
    { header: "Fec_Emi", key: "emision", width: 15  },
    { header: "Fec_Vcto", key: "fecvec", width: 12  },
    { header: "Moneda", key: "moneda", width: 15  },
    { header: "Total_Documento", key: "documento", width: 15  },
    { header: "Monto_Pagada", key: "Monto", width: 18  },
    { header: "Saldo_Pendiente", key: "Saldo", width: 15  }
  ];


  sheet.getColumn(1).alignment={vertical:'middle',horizontal:'center'}
sheet.getColumn(2).alignment={vertical:'middle',horizontal:'center'}
sheet.getColumn(3).alignment={vertical:'middle',horizontal:'center'}
sheet.getColumn(4).alignment={vertical:'middle',horizontal:'center'}
sheet.getColumn(5).alignment={vertical:'middle',horizontal:'center'}
sheet.getColumn(6).alignment={vertical:'middle',horizontal:'center'}
sheet.getColumn(7).alignment={vertical:'middle',horizontal:'center'}



data.rows.forEach( (item:any)=>{
  const row = sheet.addRow({
    serie:item.SERIE_CORREL,
    emision:item.Fec_Emision,
    fecvec:item.Fec_VCTO,
    moneda:item.Moneda,
    documento:item.Total_Documento, 
    Monto:item.Monto_pagado,
    Saldo:item.Saldo_pendiente
   })

   row.getCell("emision").value = moment().format("MM/DD/YYYY");
   row.getCell("fecvec").value = moment().format("MM/DD/YYYY");

   
  // const sunat= row.getCell('sunat').alignment={vertical:'middle',horizontal:'center'}
  // const emision= row.getCell('emision').alignment={vertical:'middle',horizontal:'center'}
  // const fec_pago= row.getCell('fec_pago').alignment={vertical:'middle',horizontal:'center'}
  // const moneda= row.getCell('moneda').alignment={vertical:'middle',horizontal:'center'}



  const totalfac= row.getCell("totalfac");
  totalfac.numFmt = "$ #,##0.000";

  const Retenido= row.getCell("Retenido");
  Retenido.numFmt = "$ #,##0.000";

 })



 resp.setHeader(
  "Content-Type",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
);
resp.setHeader(
  "Content-Disposition",
  "attachment; filename=" + "report.xlsx"
);

await workbook.xlsx.write(resp);
resp.end();


}










// cuentas de banco
export const getBankAccount= async( req:Request, resp:Response)=>{

}
