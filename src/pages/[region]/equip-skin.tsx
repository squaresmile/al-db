import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import React from "react";
import { Accordion, Table } from "react-bootstrap";

import Region from "../../data/Schema/Region";
import EquipSkin from "../../data/Schema/sharecfg/EquipSkin";
import EquipSkinTheme from "../../data/Schema/sharecfg/EquipSkinTheme";
import EquipType from "../../data/Schema/sharecfg/EquipType";
import {
    fetchEquipSkin,
    fetchEquipSkinTheme,
    fetchEquipType,
    ASSET_URL,
} from "../../data/fetch";
import { getStaticPaths as indexGetStaticPaths } from "./index";

const EquipSkinTable = ({
    skins,
    equipType,
}: {
    skins: EquipSkin[];
    equipType: Map<number, EquipType>;
}) => {
    return (
        <Table responsive hover>
            <thead>
                <tr>
                    <th>Skin</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                {skins.map((skin) => (
                    <tr key={skin.id}>
                        <td>
                            <img
                                src={`${ASSET_URL}/equips/${skin.icon}.png`}
                                width="40px"
                                alt={`Weapon Skin ${skin.name}`}
                            />
                        </td>
                        <td>{skin.name}</td>
                        <td>
                            {skin.equip_type.map((eqType) => (
                                <React.Fragment key={eqType}>
                                    {equipType.get(eqType)?.type_name2 ??
                                        `Unknown type ${eqType}`}
                                    <br />
                                </React.Fragment>
                            ))}
                        </td>
                        <td>{skin.desc}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

interface IProps {
    region: Region;
    equipSkin: EquipSkin[];
    equipSkinTheme: EquipSkinTheme[];
    equipType: EquipType[];
}

const EquipSkins = ({
    region,
    equipSkin,
    equipSkinTheme,
    equipType,
}: IProps) => {
    if (equipSkinTheme.length === 0) {
        return <></>;
    }

    const latestTheme = Math.max(
        ...equipSkinTheme.map((theme) => theme.id).filter((id) => id < 100)
    ).toString();

    const equipTypeInfo = new Map(
        equipType.map((eqType) => [eqType.equip_type, eqType])
    );

    return (
        <>
            <h1>{region} Equip Skin</h1>
            <br />
            <Accordion defaultActiveKey={[latestTheme]} flush alwaysOpen>
                {equipSkinTheme.map((theme) => (
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
                            <EquipSkinTable
                                skins={equipSkin.filter(
                                    (skin) =>
                                        theme.ids.includes(skin.id) ||
                                        skin.themeid === theme.id
                                )}
                                equipType={equipTypeInfo}
                            />
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
    const [equipSkin, equipSkinTheme, equipType] = await Promise.all([
        fetchEquipSkin(region),
        fetchEquipSkinTheme(region),
        fetchEquipType(region),
    ]);
    return { props: { region, equipSkin, equipSkinTheme, equipType } };
};

const EquipSkinPage = (
    props: InferGetStaticPropsType<typeof getStaticProps>
) => {
    return (
        <>
            <Head>
                <title>{props.region} Equip Skins</title>
            </Head>
            <EquipSkins {...(props as IProps)} />
        </>
    );
};

export default EquipSkinPage;
