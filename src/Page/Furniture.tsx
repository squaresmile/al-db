import { useEffect, useState } from "react";
import { Accordion, Table } from "react-bootstrap";

import Region from "../Data/Schema/Region";
import BackyardTheme from "../Data/Schema/sharecfg/BackyardTheme";
import Furniture from "../Data/Schema/sharecfg/Furniture";
import FurnitureShop from "../Data/Schema/sharecfg/FurnitureShop";
import {
    ASSET_URL,
    fetchFurniture,
    fetchBackyardTheme,
    fetchFurnitureShop,
} from "../Data/fetch";
import "./Table.css";

const furnitureTypeName = new Map([
    [1, "Wallpaper"],
    [2, "Furni"],
    [3, "Décor"],
    [4, "Floor"],
    [5, "Flat Furni"],
    [6, "Wall"],
]);

const FurnitureTable = ({
    furnitures,
    furnituresCost,
}: {
    furnitures: Furniture[];
    furnituresCost: Map<number, FurnitureShop>;
}) => {
    return (
        <Table responsive hover>
            <thead>
                <tr>
                    <th>Icon</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Type</th>
                    <th className="align-center">Quantity</th>
                    <th className="align-right">Coin</th>
                    <th className="align-right">Gem</th>
                    <th className="align-center">Comfort</th>
                    <th className="align-right">Size</th>
                </tr>
            </thead>
            <tbody>
                {furnitures.map((furniture) => {
                    const furnitureCost = furnituresCost.get(furniture.id);
                    return (
                        <tr key={furniture.id}>
                            <td>
                                <img
                                    src={`${ASSET_URL}/furnitureicon/${furniture.icon}.png`}
                                    width="40px"
                                    alt={`${furniture.name} icon`}
                                />
                            </td>
                            <td>{furniture.name}</td>
                            <td>{furniture.describe}</td>
                            <td>
                                {furnitureTypeName.get(furniture.type) ??
                                    furniture.type}
                            </td>
                            <td className="align-center">{furniture.count}</td>
                            <td className="align-right">
                                {furnitureCost?.dorm_icon_price ?? ""}
                            </td>
                            <td className="align-right">
                                {furnitureCost?.gem_price ?? ""}
                            </td>
                            <td className="align-center">
                                +{furniture.comfortable}
                            </td>
                            <td className="align-right">
                                {furniture.size.length === 2
                                    ? `${furniture.size[0]}×${furniture.size[1]}`
                                    : ""}
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    );
};

const FurniturePage = ({ region }: { region: Region }) => {
    const [furniture, setFurniture] = useState<Furniture[]>([]);
    const [furnitureShop, setFurnitureShop] = useState<FurnitureShop[]>([]);
    const [backyardTheme, setBackyardTheme] = useState<BackyardTheme[]>([]);

    useEffect(() => {
        Promise.all([
            fetchFurniture(region),
            fetchFurnitureShop(region),
            fetchBackyardTheme(region),
        ]).then(([furniture, furnitureShop, backyardTheme]) => {
            setFurniture(furniture);
            setFurnitureShop(furnitureShop);
            setBackyardTheme(backyardTheme);
        });
    }, [region]);

    if (backyardTheme.length === 0) {
        return <>Loading data</>;
    }

    const latestTheme = Math.max(
        ...backyardTheme.map((theme) => theme.id)
    ).toString();

    const furnitureCostInfo = new Map(
        furnitureShop.map((furnitureShop) => [furnitureShop.id, furnitureShop])
    );

    return (
        <>
            <h1>{region} Furniture</h1>
            <br />
            <Accordion defaultActiveKey={latestTheme} flush>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>
                        0 &mdash; Furniture without Set
                    </Accordion.Header>
                    <Accordion.Body>
                        <FurnitureTable
                            furnitures={furniture.filter(
                                (furniture) => furniture.themeId === 0
                            )}
                            furnituresCost={furnitureCostInfo}
                        />
                    </Accordion.Body>
                </Accordion.Item>
                {backyardTheme.map((theme) => (
                    <Accordion.Item
                        key={theme.id}
                        eventKey={theme.id.toString()}
                    >
                        <Accordion.Header>
                            {theme.id} &mdash; {theme.name}
                            {theme.desc !== "" ? ` — ${theme.desc}` : ""}
                        </Accordion.Header>
                        <Accordion.Body>
                            <FurnitureTable
                                furnitures={furniture.filter(
                                    (furniture) =>
                                        theme.ids.includes(furniture.id) ||
                                        furniture.themeId === theme.id
                                )}
                                furnituresCost={furnitureCostInfo}
                            />
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>
        </>
    );
};

export default FurniturePage;
