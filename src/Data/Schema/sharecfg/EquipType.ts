export default interface EquipType {
    type_name2: string;
    compare_group: number;
    equip_type: number;
    equip_skin: number;
    type_name: string;
    distory_resource_gold_ratio: number;
}

export interface EquipTypeTemplate {
    [key: string]: EquipType;
}
