import Region from "./Schema/Region";
import EquipSkin, { EquipSkinTemplate } from "./Schema/sharecfg/EquipSkin";
import EquipSkinTheme, {
    EquipSkinThemeTemplate,
} from "./Schema/sharecfg/EquipSkinTheme";
import EquipType, { EquipTypeTemplate } from "./Schema/sharecfg/EquipType";

const BASE_URL =
    "https://raw.githubusercontent.com/AzurLaneTools/AzurLaneData/main";

export const ASSET_URL = "https://al.square.ovh/assets";

type CfgFolder = "GameCfg" | "ShareCfg" | "sharecfgdata" | null;

async function fetchData<T>(
    region: Region,
    location: CfgFolder,
    file: string
): Promise<T> {
    return fetch(`${BASE_URL}/${region}/${location}/${file}.json`).then((res) =>
        res.json()
    );
}

function objectToList<T>(obj: { [key: string]: T }): T[] {
    return Object.entries(obj)
        .filter(([id, _]) => id !== "all")
        .map(([_, data]) => data);
}

export async function fetchEquipSkin(region: Region): Promise<EquipSkin[]> {
    const equipSkin = await fetchData<EquipSkinTemplate>(
        region,
        "ShareCfg",
        "equip_skin_template"
    );
    return objectToList(equipSkin);
}

export async function fetchEquipSkinTheme(
    region: Region
): Promise<EquipSkinTheme[]> {
    const equipSkinTheme = await fetchData<EquipSkinThemeTemplate>(
        region,
        "ShareCfg",
        "equip_skin_theme_template"
    );
    return objectToList(equipSkinTheme);
}

export async function fetchEquipType(region: Region): Promise<EquipType[]> {
    const equipSkin = await fetchData<EquipTypeTemplate>(
        region,
        "ShareCfg",
        "equip_data_by_type"
    );
    return objectToList(equipSkin);
}
