import mongoose from 'mongoose';
import { Document } from 'mongoose';

export interface IStationWork extends Document {
    entity_id: string;
    created_at: Date;
    name: string;
    address: string;
}

const stationWorkSchema = new mongoose.Schema<IStationWork>({
    entity_id: {type: String, required: true},
    created_at: {type: Date, default: Date.now},
}, {
    strict: false,
});

const StationWork = mongoose.model<IStationWork>('StationWork', stationWorkSchema);

export default StationWork;