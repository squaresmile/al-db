export default interface EquipSkinTheme {
    ids: number[];
    name: string;
    id: number;
}

export interface EquipSkinThemeTemplate {
    [key: string]: EquipSkinTheme;
}
