

import express , {Application , Request , Response} from 'express';
import { createPdf, errorPdfHtmlTemplate } from '../helpers/pdf';

class Server{

    private app:Application;

    private port:string;


    constructor(){
        this.app = express();
        this.port = process.env.PORT || '3001';

        this.listen();

        this.router();
    }

    listen(){
        this.app.listen(this.port , () => console.log(  " port serve in " + this.port));
    } 
    
    router(){
        this.app.get('/', async function (req: Request, res: Response) {
            try {
              const binaryResult = await createPdf();
              // const html = '<h1>Hola</h1>';
              res.setHeader('Content-disposition', 'attachment; filename=report.pdf');
              res.type('pdf').send(binaryResult);
            } catch (err: any) {
              console.log(err);
              res.send(errorPdfHtmlTemplate(err.message));
            }
            // pdfDoc.pipe(fs.createWriteStream('pdfs/tables.pdf'));
            // pdfDoc.end();
          });
    }

    midlewares(){
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
    }

}




export default Server;