import winston from 'winston';
import fs from 'fs';
import { WinstonTransport as AxiomTransport } from '@axiomhq/winston';

const logDir = 'logs';
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

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