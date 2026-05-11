import type { Request, Response } from 'express';
import Station from '../models/Station.js';
import StationWork from '../models/StationWork.js';


export const getStationsWorks = async (req: Request, res: Response) => {
    try {
        const stationsWorks = await StationWork.aggregate([
            {
                $project: {
                    entity_id: 1,
                    data: 1,
                    'lastTimeScan': 1,
                    _id: 0,
                }
            }, {
                $unset: [
                    'data.images',
                    'data.apply_time',
                    'data.close_time', 
                    'data.day_of_weeks',
                    'data.holiday',
                ]
            }
        ])
        res.status(200).json(stationsWorks);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
}