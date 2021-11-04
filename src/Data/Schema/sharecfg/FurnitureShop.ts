export default interface FurnitureShop {
    discount_time: string;
    id: number;
    discount: number;
    not_for_sale: number;
    dorm_icon_price: number;
    time: [
        [[number, number, number], [number, number, number]],
        [[number, number, number], [number, number, number]]
    ];
    gem_price: number;
    new: number;
}

export interface FurnitureShopTemplate {
    [key: string]: FurnitureShop;
}
