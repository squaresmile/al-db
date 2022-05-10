import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Accordion, Table } from "react-bootstrap";

import Region from "../../data/Schema/Region";
import BackyardTheme from "../../data/Schema/sharecfg/BackyardTheme";
import Furniture from "../../data/Schema/sharecfg/Furniture";
import FurnitureShop from "../../data/Schema/sharecfg/FurnitureShop";
import {
    ASSET_URL,
    fetchFurniture,
    fetchBackyardTheme,
    fetchFurnitureShop,
} from "../../data/fetch";
import { getStaticPaths as indexGetStaticPaths } from "./index";

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
                    <th className="text-center">Quantity</th>
                    <th className="text-end">Coin</th>
                    <th className="text-end">Gem</th>
                    <th className="text-center">Comfort</th>
                    <th className="text-end">Size</th>
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
                            <td className="text-center">{furniture.count}</td>
                            <td className="text-end">
                                {furnitureCost?.dorm_icon_price ?? ""}
                            </td>
                            <td className="text-end">
                                {furnitureCost?.gem_price ?? ""}
                            </td>
                            <td className="text-center">
                                +{furniture.comfortable}
                            </td>
                            <td className="text-end">
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

interface IProps {
    region: Region;
    furniture: Furniture[];
    furnitureShop: FurnitureShop[];
    backyardTheme: BackyardTheme[];
}

const Furnitures = ({
    region,
    furniture,
    furnitureShop,
    backyardTheme,
}: IProps) => {
    if (backyardTheme.length === 0) {
        return <></>;
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
            <Accordion defaultActiveKey={[latestTheme]} flush alwaysOpen>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>
                        0 &mdash; Furniture without Set
                    </Accordion.Header>
                    <Accordion.Collapse eventKey="0" mountOnEnter unmountOnExit>
                        <FurnitureTable
                            furnitures={furniture.filter(
                                (furniture) => furniture.themeId === 0
                            )}
                            furnituresCost={furnitureCostInfo}
                        />
                    </Accordion.Collapse>
                </Accordion.Item>
                {backyardTheme.map((theme) => (
                    <Accordion.Item
                        key={theme.id}
                        eventKey={theme.id.toString()}
                    >
                        <Accordion.Header>
                            {theme.id} &mdash; {theme.name}
                        </Accordion.Header>
                        <Accordion.Collapse
                            eventKey={theme.id.toString()}
                            mountOnEnter
                            unmountOnExit
                        >
                            <div>
                                {theme.desc !== "" && (
                                    <div className="my-3">{theme.desc}</div>
                                )}
                                <FurnitureTable
                                    furnitures={furniture.filter(
                                        (furniture) =>
                                            theme.ids.includes(furniture.id) ||
                                            furniture.themeId === theme.id
                                    )}
                                    furnituresCost={furnitureCostInfo}
                                />
                            </div>
                        </Accordion.Collapse>
                    </Accordion.Item>
                ))}
            </Accordion>
        </>
    );
};
export const getStaticPaths = indexGetStaticPaths;

export const getStaticProps: GetStaticProps = async (context) => {
    const region = (context.params?.region ?? "EN") as Region;
    const [furniture, furnitureShop, backyardTheme] = await Promise.all([
        fetchFurniture(region),
        fetchFurnitureShop(region),
        fetchBackyardTheme(region),
    ]);
    return { props: { region, furniture, furnitureShop, backyardTheme } };
};
const FurniturePage = (
    props: InferGetStaticPropsType<typeof getStaticProps>
) => {
    return (
        <>
            <Head>
                <title>{props.region} Furnitures</title>
            </Head>
            <Furnitures {...(props as IProps)} />
        </>
    );
};

export default FurniturePage;
