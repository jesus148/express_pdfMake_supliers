  import PdfPrinter from 'pdfmake';
  import {docDefinitionRest} from '../doct';
  import { Roboto } from '../fonts';

  // metodo crea el pdf
  export const createPdf = async ( cardCode :string , withholdingNumnber:string): Promise<Buffer> => {





    // pdf estilos
    const printer = new PdfPrinter({ Roboto });

    const data = docDefinitionRest(cardCode, withholdingNumnber);

    if(!data){
      throw new Error("no se pudo generar")
    }


    // llama al metodo pdf crear 
    // const pdfDoc = printer.createPdfKitDocument(docDefinition);
    const pdfDoc = printer.createPdfKitDocument(await data);



    return new Promise((resolve, reject) => {
      try {


        const chunks: Uint8Array[] = [];
        
        pdfDoc.on('data', (chunk) => chunks.push(chunk));
        pdfDoc.on('end', () => resolve(Buffer.concat(chunks)));
        pdfDoc.end();
      } catch (err) {
        reject(err);
      }
    });
  };

  export const errorPdfHtmlTemplate = (error: string): string => `
  <h2>There was an error displaying the PDF document.</h2>
  Error message: ${error}`;
