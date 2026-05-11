import { getDistance } from 'geolib';

export const calculateDistance = (latitude1: number, longitude1: number, latitude2: number, longitude2: number) => {
    return getDistance({ latitude: latitude1, longitude: longitude1 }, { latitude: latitude2, longitude: longitude2 });
}