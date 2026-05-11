import mongoose from 'mongoose';
import { Document } from 'mongoose';

export interface IStation extends Document {
    entity_id: string;
    created_at: Date;
    updated_at: Date;
    lastTimeScan: Date;
}

const stationSchema = new mongoose.Schema<IStation>({
    entity_id: {type: String, required: true},
    created_at: {type: Date, default: Date.now},
    lastTimeScan: {type: Date, default: null},
    updated_at: {type: Date, default: Date.now},
}, {
    strict: false,
});

const Station = mongoose.model<IStation>('Station', stationSchema);

export default Station;