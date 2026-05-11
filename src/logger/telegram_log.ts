import winston from 'winston';
import { WinstonTransport as AxiomTransport } from '@axiomhq/winston';
import fs from 'fs';

const logDir = 'logs';
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

const telegramLogger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(),
        new AxiomTransport({
            dataset: 'telegram',
            token: process.env.AXIOM_TOKEN || '',
        }),
    ],
});

export default telegramLogger;