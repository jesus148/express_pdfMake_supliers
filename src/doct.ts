
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
                                      text: 'R.U.C.: 20100006538',
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
                                      text: 'R001-6819',
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
                  text:'Fecha de emisión  :  2024-10-02',
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
                  marginLeft:110,
                },
                {
                  text:'Tasa de retención (%)  :  3.00',
                  fontSize:10,
                  marginTop:3,
                  marginLeft:110,
                }
                ]


              }


              
        ]
    }
  ],



  
  styles: {
    header: {
      fontSize: 118,
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
