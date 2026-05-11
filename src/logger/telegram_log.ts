import winston from 'winston';
import { WinstonTransport as AxiomTransport } from '@axiomhq/winston';

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