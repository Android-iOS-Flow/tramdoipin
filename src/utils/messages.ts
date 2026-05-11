import { calculateDistance } from "./calculator.js";
import type { IUser } from "../models/User.js";

export const messages = {
    welcome: "👋 Xin chào! Đây là bot tra cứu trạm đổi pin VinFast.\n\nGửi /tram hoặc tên trạm để tìm kiếm.",
    find_station: "🔍 Tìm kiếm trạm đổi pin VinFast.\n\nGửi /tram hoặc tên trạm để tìm kiếm.",
    stationToDetail: (station: any, user: any) =>
        `ID: ${station.entity_id}\n` +
        `📍 ${station.address}\n` +
        `Status: ${station['data']['status']}\n` +
        `PIN: ${station['data']['number_battery_available']}/${station['data']['number_battery']}\n` +
        `Khoảng cách: ${calculateDistance(Number(user.latitude), Number(user.longitude), Number(station.data.latitude), Number(station.data.longitude))} km`
}