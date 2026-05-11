import mongoose from 'mongoose';
import { Document } from 'mongoose';

export interface IUser extends Document  {
    telegramId: string;
    username: string;
    firstName: string;
    isBot: boolean;
    createdAt: Date;
    latitude: number;
    longitude: number;
}

const userSchema = new mongoose.Schema<IUser >({
    telegramId: { type: String, required: true, unique: true },
    username: { type: String },
    firstName: { type: String },
    isBot: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    latitude: { type: Number, default: 0 },
    longitude: { type: Number, default: 0 }
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;