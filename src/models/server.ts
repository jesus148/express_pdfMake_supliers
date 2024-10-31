

import express , {Application , Request , Response} from 'express';
import { createPdf, errorPdfHtmlTemplate } from '../helpers/pdf';
import routerExcel from '../routes/excel.routes';

class Server{

    private app:Application;

    private port:string;


    private routerExcel:string;


    constructor(){
        this.app = express();
        this.port = process.env.PORT || '3001';

        this.routerExcel='/api/supliers';
        this.listen();
        this.midlewares();
        this.router();

    }

    listen(){
        this.app.listen(this.port , () => console.log(  " port serve in " + this.port));
    } 
    
    router(){
      // http://localhost:3000/pdf/P20600987381/6819
        this.app.get('/pdf/:cardCode/:withholdingNumnber', async function (req: Request, res: Response) {
            try {

              const cardCode = req.params.cardCode;
              const withholdingNumnber = req.params.withholdingNumnber;

              
              const binaryResult = await createPdf(cardCode, withholdingNumnber);
              // const html = '<h1>Hola</h1>';
              // nombre pdf
              res.setHeader('Content-disposition', 'attachment; filename=report.pdf');
              // envio al front
              res.type('pdf').send(binaryResult);
            // error
            } catch (err: any) {
              console.log(err);
              res.send(errorPdfHtmlTemplate(err.message));
            }
            // pdfDoc.pipe(fs.createWriteStream('pdfs/tables.pdf'));
            // pdfDoc.end();
          });


          this.app.use(this.routerExcel,  routerExcel)
    }

    midlewares(){
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
    }

}




export default Server;