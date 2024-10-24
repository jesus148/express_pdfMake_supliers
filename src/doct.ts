
import { TDocumentDefinitions } from 'pdfmake/interfaces';

export const docDefinition: TDocumentDefinitions = {
  pageSize:'A4',
  pageOrientation:'landscape',
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
                        text:'Callao - Callao',
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
                        text:'Señor(es) :  LC INNOVACION TECNOLOGICA S.A.C.',
                        fontSize:10,
                        marginTop:3
                    },
                    {
                        text:'RUC  :  20600987481',
                        fontSize:10,
                        marginTop:3
                    },
                    {
                        text:'DIRECCION  :  JR. CALLAO MZA. I LOTE. 1 URB. SANTA ROSA CALLAO PROV. DEL CALLAO',
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
                              x: 0,
                              y: 0,
                              w: 250,    // Ajusta el ancho del rectángulo según tu tabla
                              h: 130,    // Ajusta el alto del rectángulo
                              r: 10,     // Radio para redondear las esquinas
                              lineWidth: 3,
                              lineColor: '#0000ff' // Color del borde
                            }
                          ],
                          margin: [0, 0, 0, -120]  // Ajusta el margen para superponer la tabla correctamente
                        },
                        {
                          
                          table:{
                            widths:['*'],
                            
                            body:[
                              [
                                {
                                  stack:[
                                    {
                                      text: 'R.U.C.: 20100006538',
                                      alignment: 'center',
                                      bold: true,
                                      fontSize: 12,
                                      color: '#0000ff', // Azul
                                    },
                                    {
                                      text: 'Comprobante de Retención',
                                      alignment: 'center',
                                      bold: true,
                                      fontSize: 12,
                                      color: '#0000ff', // Azul
                                    },
                                    {
                                      text: 'Electrónico',
                                      alignment: 'center',
                                      bold: true,
                                      fontSize: 12,
                                      color: '#0000ff', // Azul
                                    },
                                    {
                                      text: 'R001-6819',
                                      alignment: 'center',
                                      bold: true,
                                      fontSize: 12,
                                      color: '#0000ff', // Azul
                                    }
                                  ]
                                }
                              ]
                            ]
                          },
                          // estilos tabla
                          layout:{
                           
                            hLineWidth: function () { return 3; }, // Grosor del borde horizontal
                            vLineWidth: function () { return 3; }, // Grosor del borde vertical
                            hLineColor: function () { return '#0000ff'; }, // Color del borde horizontal
                            vLineColor: function () { return '#0000ff'; }, // Color del borde vertical
                            paddingLeft: function () { return 10; }, // Padding izquierdo
                            paddingRight: function () { return 10; }, // Padding derecho
                            paddingTop: function () { return 10; }, // Padding superior
                            paddingBottom: function () { return 10; }, // Padding inferior
                            fillColor: function () { return null; } // Sin color de fondo
                            // lineJoin: 'round', // Bordes redondeados
                            
                      
                          }
                        }
                      ]
                      

                    }
                  ]
                  
                },
                {
                  text:'jesus'
                }
                ]


              }


              
        ]
    }
  ],



  
  styles: {
    header: {
      fontSize: 18,
      bold: true,
      margin: [0, 0, 0, 10],
    },
    subheader: {
      fontSize: 16,
      bold: true,
      margin: [0, 10, 0, 5],
    },
    tableExample: {
      margin: [0, 5, 0, 15],
    },
  },
};
