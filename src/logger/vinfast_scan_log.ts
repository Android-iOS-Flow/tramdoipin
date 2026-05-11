import winston from 'winston';
import { WinstonTransport as AxiomTransport } from '@axiomhq/winston';

const vinfastScanLogger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        // new winston.transports.Console(),
        new AxiomTransport({
            dataset: 'vinfast_scan',
            token: process.env.AXIOM_TOKEN || '',
        }),
    ],
});

export default vinfastScanLogger;