export default interface Furniture {
    advice: number;
    id: number;
    belong: number;
    deblocking: number;
    comfortable: number;
    size: number[];
    canputon: number;
    offset: number[];
    picture: string;
    spine_action_replace: string;
    can_rotate: number;
    interAction_group: number[];
    effect: string;
    canputonGrid: [number, number][];
    level: number;
    spine_extra: string;
    icon: string;
    themeId: number;
    can_trigger: number[];
    is_3d_obj: number;
    rarity: number;
    tag: number;
    is_get_time_note: number;
    describe: string;
    dorm_id: number;
    dir: number;
    type: number;
    gain_by: "";
    name: string;
    count: number;
}

export interface FurnitureTemplate {
    [key: string]: Furniture;
}
