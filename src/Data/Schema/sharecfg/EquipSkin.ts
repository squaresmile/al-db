export default interface EquipSkin {
    ship_skin_id: number;
    derivate_torpedo: string;
    id: number;
    derivate_bullet: string;
    attachment_key: number;
    rarity: number;
    mirror: number;
    themeid: number;
    weapon_ids: number[];
    equip_type: number[];
    derivate_boom: string;
    ship_config_id: number;
    desc: string;
    icon: string;
    attachment_combat_scene: string;
    attachment_combat_ui: string;
    type: number;
    attachment_cusual: string;
    name: string;
    bullet_name: string;
}

export interface EquipSkinTemplate {
    [key: string]: EquipSkin;
}
