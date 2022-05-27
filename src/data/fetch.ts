import Region from "./Schema/Region";
import BackyardTheme from "./Schema/sharecfg/BackyardTheme";
import EquipSkin from "./Schema/sharecfg/EquipSkin";
import EquipSkinTheme from "./Schema/sharecfg/EquipSkinTheme";
import EquipType from "./Schema/sharecfg/EquipType";
import Furniture from "./Schema/sharecfg/Furniture";
import FurnitureShop from "./Schema/sharecfg/FurnitureShop";

const BASE_URL =
    "https://raw.githubusercontent.com/AzurLaneTools/AzurLaneData/main";

export const ASSET_URL = "https://al.square.ovh/assets";

type CfgFolder = "GameCfg" | "ShareCfg" | "sharecfgdata" | null;

async function fetchData<T>(
    region: Region,
    file: string,
    location: CfgFolder = "ShareCfg"
): Promise<T[]> {
    const templateData: { [key: string]: T } = await fetch(
        `${BASE_URL}/${region}/${location}/${file}.json`
    ).then((res) => res.json());
    return objectToList(templateData);
}

function objectToList<T>(obj: { [key: string]: T }): T[] {
    return Object.entries(obj)
        .filter(([id, _]) => id !== "all")
        .map(([_, data]) => data);
}

export async function fetchEquipSkin(region: Region) {
    return fetchData<EquipSkin>(region, "equip_skin_template");
}

export async function fetchEquipSkinTheme(region: Region) {
    return fetchData<EquipSkinTheme>(region, "equip_skin_theme_template");
}

export async function fetchEquipType(region: Region) {
    return fetchData<EquipType>(region, "equip_data_by_type");
}

export async function fetchFurniture(region: Region) {
    return fetchData<Furniture>(region, "furniture_data_template");
}

export async function fetchFurnitureShop(region: Region) {
    return fetchData<FurnitureShop>(region, "furniture_shop_template");
}

export async function fetchBackyardTheme(region: Region) {
    return fetchData<BackyardTheme>(region, "backyard_theme_template");
}
