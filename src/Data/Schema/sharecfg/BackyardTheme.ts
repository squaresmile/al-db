export default interface BackyardTheme {
    discount_time: string;
    comfortable: number;
    icon: string;
    id: number;
    ids: number[];
    discount: number;
    order: number;
    is_view: number;
    Cfg_2: number;
    deblocking: number;
    new: number;
    desc: string;
    hot: number;
    name: string;
    Cfg_1: number;
}

export interface BackyardThemeTemplate {
    [key: string]: BackyardTheme;
}
