
import { response, text } from 'express';
import { TDocumentDefinitions } from 'pdfmake/interfaces';



export const docDefinitionRest = async (cardCode:any ,withholdingNumnber :any):Promise<TDocumentDefinitions>=>{
  

    const apiUrl ="http://52.207.189.125:3000";
    data:[];
    const response = await fetch(`${apiUrl}/withholdings-with-filters?cardCode=${cardCode}&withholdingNumnber=${withholdingNumnber}`);
    const data = await response.json();
     console.log(data);

     let rowForTable: any = [
      // [
      //   { text: 'COMPROBANTES QUE DAN ORIGEN A LA RETENCIÓN' , colSpan:7 , style: "tableHeader"}, 
      //   {},
      //   {},
      //   {},
      //   {}, 
      //   {},
      //   {},
      //   { text: 'TIPO DE CAMBIO' , rowSpan:2 , style: "tableHeader"}, 
      //   { text: 'TOTAL A AFECTO A RETENCIÓN $/', rowSpan:2 , style: "tableHeader" }, 
      //   { text: 'TOTAL RETENCIÓN $/', rowSpan:2 , style: "tableHeader"}
      // ],[
      //   { text:"TIPO", style: "tableHeader"},
      //   {text:"NÚMERO DE DOC.", style: "tableHeader"},
      //   { text:"FECHA", style: "tableHeader"},
      //   { text:"IMPORTE ORIGINAL", style: "tableHeader"},
      //   { text:"FECHA PAGO",style: "tableHeader" },
      //   {text:"NRO DE PAGO", style: "tableHeader"},
      //   { text:"IMPORTE PAGO",style: "tableHeader"} ,
      //   {text:"",style: "tableHeader"},
      //   {text:"" , style: "tableHeader"},
      //   {text:"", style: "tableHeader"}
      // ]
     ];


     let tableRows: any = [
      [
        { text: 'COMPROBANTES QUE DAN ORIGEN A LA RETENCIÓN' , colSpan:7 , style: "tableHeader"}, 
        {},
        {},
        {},
        {}, 
        {},
        {},
        { text: 'TIPO DE CAMBIO' , rowSpan:2 , style: "tableHeader"}, 
        { text: 'TOTAL A AFECTO A RETENCIÓN $/', rowSpan:2 , style: "tableHeader" }, 
        { text: 'TOTAL RETENCIÓN $/', rowSpan:2 , style: "tableHeader"}
      ],
      [
        { text:"TIPO", style: "tableHeader"},
        {text:"NÚMERO DE DOC.", style: "tableHeader"},
        { text:"FECHA", style: "tableHeader"},
        { text:"IMPORTE ORIGINAL", style: "tableHeader"},
        { text:"FECHA PAGO",style: "tableHeader"},
        {text:"NRO DE PAGO", style: "tableHeader"},
        { text:"IMPORTE PAGO",style: "tableHeader"} ,
        {text:"",style: "tableHeader"},
        {text:"" , style: "tableHeader"},
        {text:"", style: "tableHeader"}
      ]
     ];
     data.rows.forEach((item:any) => {
      
       let tempRow: any = [];

       tempRow.push({ text: item.TIPO, style: 'tablecontent'});
       tempRow.push({ text: item.SERIE_CORRELATIVO, style: 'tablecontent'});
       tempRow.push({ text: item.FEC_EMI_FACT.split(' ')[0], style: 'tablecontent'});
       tempRow.push({ text: `USD ${Number(item.TOTAL_FACT)}`, style: 'tablecontent'});
       tempRow.push({ text: item.FECHA_RETENCION.split(' ')[0], style: 'tablecontent'});
       tempRow.push({ text: Number(item.TIPO) , style: 'tablecontent'});
       tempRow.push({ text:  `USD ${Number(item.TOTAL_FACT)}` , style: 'tablecontent'});
       tempRow.push({ text: Number(item.TC).toFixed(5), style: 'tablecontent'});
       tempRow.push({ text:`PEN ${Number(item.TOTAL_PAGO).toLocaleString('en-US')}` , style: 'tablecontent'});
       tempRow.push({ text: `PEN ${Number(item.RETENIDO).toLocaleString('en-US')}` , style: 'tablecontent'});
       tableRows.push(tempRow);
     });

     let totalAfecto:number=0;
     data.rows.forEach((item:any)=>{
      totalAfecto+=Number(item.TOTAL_PAGO);
     })

     let totalRetencion:number=0;
     data.rows.forEach((item:any)=>{
      totalRetencion+=Number(item.RETENIDO);
     })



     tableRows.push( 
      [{text:"Observaciones: -", colSpan:"8" , style:"tablefooterLeft" } ,{},{},{},{},{},{},{}, {text:`PEN ${Number(totalAfecto).toLocaleString('en-us')} `, style:"tablefooter"} ,{text:`PEN ${Number(totalRetencion).toLocaleString('en-us')} `, style:"tablefooter"}]);

     console.log(rowForTable)

    const docDefinition: TDocumentDefinitions  = {

     pageSize:'A4',
     pageOrientation:'landscape',
     pageMargins: [30, 30, 30, 120],
     content: [
       {
           columns:[
               {
                   // auto-sized columns have their widths based on their content
                   width: '50%',
                   stack:[
                       {  
                             image: 'src/logoMP.png',
                             width:140,
                             height:30
                       },
                       {
                           text:'MARCO PERUANA SA',
                           fontSize:10,
                           marginTop:3
                       },
                       {
                           text:'Dirección Fiscal  :  AV. SAENZ PEÑA NRO. 1439 Callao Callao PRO',
                           fontSize:10,
                           marginTop:3
                       },
                       {
                           text:'Callao - Callao' ,
                           fontSize:10,
                           marginTop:3
                       },
                       {
                           text:'Telef.  :  (511) 201 4800',
                           fontSize:10,
                           marginTop:3
                       }
                       ,
                       {
                           text: 'Señor(es) : ' + data.rows[0].PROV_RZ,
                           fontSize:10,
                           marginTop:3
                       },
                       {
                           text:`RUC : ${data.rows[0].PROV_RUC}`,
                           fontSize:10,
                           marginTop:3
                       },
                       {
                           text:`DIRECCION : ${data.rows[0].PROV_DIR}`,
                           fontSize:10,
                           marginTop:3
                       }
                   ]
                 },
                 {
                   width:'10%',
                   text:''
                 },
                 {
   
                   width: '40%',
                   
                   stack:[
                     
                   {
   
                     columns:[
                       {
                         stack:[
                           {
                             canvas: [
                               {
                                 type: 'rect',
                                 x: 50,
                                 y: 0,
                                 w: 250,
                                 h: 90,
                                 r: 10, 
                                 lineColor: '#0000ff',
                                 lineWidth:3,
                                 
                               }
                             ],
                             margin: [0, 0, 0, 0]  
                           },
                           {
                             table:{
                               widths:['*'],
                               
                               body:[
                                 [
                                   {  
                                     stack:[
                                       {
                                         text: 'R.U.C.: 20100006538 ',
                                         alignment: 'center',
                                         bold: true,  
                                         fontSize: 16,
                                         color: '#0000ff',
                                         marginTop:2
                                       },
                                       {
                                         text: 'Comprobante de Retención',
                                         alignment: 'center',
                                         bold: true,
                                         fontSize: 16,
                                         color: '#0000ff',
                                         marginTop:2
                                       },
                                       {
                                         text: 'Electrónico',
                                         alignment: 'center',
                                         bold: true,
                                         fontSize: 16,
                                         color: '#0000ff',
                                         marginTop:2
                                       },
                                       {
                                         text: `${data.rows[0].SERIE_CORRELATIVO}`,
                                         alignment: 'center',
                                         bold: true,
                                         fontSize: 16,
                                         color: '#0000ff',
                                         marginTop:2
                                       }
                                     ]
                                   }
                                 ]
                               ]
                             },
                             // estilos tabla
                             layout:{
                              defaultBorder:false
                             //   hLineWidth: function () { return 3; }, // Grosor del borde horizontal
                             //   vLineWidth: function () { return 3; }, // Grosor del borde vertical
                             //   hLineColor: function () { return '#0000ff'; }, // Color del borde horizontal
                             //   vLineColor: function () { return '#0000ff'; }, // Color del borde vertical
                             //   paddingLeft: function () { return 10; }, // Padding izquierdo
                             //   paddingRight: function () { return 10; }, // Padding derecho
                             //   paddingTop: function () { return 10; }, // Padding superior
                             //   paddingBottom: function () { return 10; }, // Padding inferior
                             //   fillColor: function () { return null; } // Sin color de fondo
                             //   // lineJoin: 'round', // Bordes redondeados
                               
                         
                             },
                             margin: [50, -90, 0, 0]  
                           }
                         ]
                       }
                     ]
                      
                   },
                   {
                    //  text:'Fecha de emisión  :  2024-10-02',
                     text:`Fecha de emisión: ${data.rows[0].FEC_EMI_FACT.split(' ')[0]}`,
                     fontSize:10,
                     marginTop:7,
                     marginLeft:110,
                     bold:true
                     // style:'subheader'
                   },
                   {
                     text:'Código de regimen  :  Tasa 3%',
                     fontSize:10,
                     marginTop:3,
                     bold:true,
                     marginLeft:110,
                   },
                   {
                     text:'Tasa de retención (%)  :  3.00',
                     fontSize:10,
                     marginTop:3,
                     marginLeft:110,
                     bold:true
                   }
                   ]
   
   
                 }
           ],
   
   
       },
       {
         table: {
        //  widths: ['*', 'auto', 100, '*'],
           headerRows: 1,
         
           body:tableRows /* [
              
             
              [{text:"data 1", style:"tablecontent" }, {text :"data 2" , style:"tablecontent"},{text:"data 3" , style:"tablecontent"  } , {text:"data 4" , style:"tablecontent"}, {text:"data" , style:"tablecontent"}, {text:"A" , style:"tablecontent"}, {text:"B", style:"tablecontent"}, {text:"data", style:"tablecontent"} , {text:"A", style:"tablecontent"}, {text: "B", style:"tablecontent"} ],
             
            
           ] */
          
         },
         layout:{
                               hLineWidth: function () { return 1; }, // Grosor del borde horizontal
                               vLineWidth: function () { return 1; }, // Grosor del borde vertical
                               hLineColor: function () { return '#000000'; }, // Color del borde horizontal
                               vLineColor: function () { return '#000000'; }, // Color del borde vertical
                               paddingLeft: function () { return 1; }, // Padding izquierdo
                               paddingRight: function () { return 1; }, // Padding derecho
                               paddingTop: function () { return 1; }, // Padding superior
                               paddingBottom: function () { return 1; }, // Padding inferior
                               fillColor: function () { return null; },// Sin color de fondo
                               // lineJoin: 'round', // Bordes redondeados
                               // hLineWidth: function (i, node) {
                               //   console.log(i, node);
                               //   return (i === 1 ) ? 1 : 0;
                               // },
                               // vLineWidth: function (i, node) {
                               //   return 0;
                               // }                                         
         },
         margin: [6, 32, 0, 0]  ,
       },
     ], 
     
     footer:{
      
      columns:[
        {
          width:'40%',
          stack:[
            {
              text:''
            }
          ]
        },
        {
          width:'20%',
          stack:[
            {
              text:''
            }
          ]
        },
        {
          width:'35%',
          alignment:'left',
          stack:[
            {
              text:'Representación impresa del comprobante de retención electrónico',
              style:'estilos1'
            },
            {
              text:'Este documento está a disposición del adquiriente o usuario en el correo electrónico que haya designado previamente',
              style:'estilos2'
            },
          ]
        },{
          width:'5%',
          stack:[
            {
              text:''
            }
          ]
        }
      ]
     },
   
     
     
     styles: {
    

       tableHeader: {
         fontSize:10,
         bold: true,
         alignment:"center",
         lineHeight:1,
         
       },
       tablecontent: {
         fontSize:10,
         bold: true,
         alignment:"right",
         lineHeight:1,
       
       },
       tablefooter: {
         fontSize:10,
         bold: true,
         alignment:"right",
         lineHeight:1,
       },
       tablefooterLeft: {
         fontSize:10,
         bold: true,
         alignment:"left",
         lineHeight:1,
       },
       // estilos footer pdf
       estilos2:{

         fontSize:10,
         bold:true,
         marginTop:7

         // font:''
        },
        estilos1:{
          
          fontSize:10,
          bold:true,
          marginTop:7
         // font:'bolditalics'
       },

      
   
     },
   };
    
  return docDefinition;
}  




