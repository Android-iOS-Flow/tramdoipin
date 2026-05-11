import { Composer } from "grammy";
import startCommand from "./start.js";
import chatidCommand from "./chatid.js";
import findStationCommand from "./find_station.js";
import mLocationCommand from "./m_location.js";


const composer = new Composer();

composer.use(startCommand);
composer.use(chatidCommand);
composer.use(findStationCommand);
composer.use(mLocationCommand);

export default composer;