import { useEffect, useState } from "react";
import { Accordion, Table } from "react-bootstrap";

import Region from "../Data/Schema/Region";
import EquipSkin from "../Data/Schema/sharecfg/EquipSkin";
import EquipSkinTheme from "../Data/Schema/sharecfg/EquipSkinTheme";
import EquipType from "../Data/Schema/sharecfg/EquipType";
import {
    fetchEquipSkin,
    fetchEquipSkinTheme,
    fetchEquipType,
    ASSET_URL,
} from "../Data/fetch";
import "./String.css";

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
                        <td className="newline">
                            {skin.equip_type
                                .map(
                                    (eqType) =>
                                        equipType.get(eqType)?.type_name2 ??
                                        `Unknown type ${eqType}`
                                )
                                .join("\n")}
                        </td>
                        <td>{skin.desc}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

const EquipSkinPage = ({ region }: { region: Region }) => {
    const [equipSkin, setEquipSkin] = useState<EquipSkin[]>([]);
    const [equipSkinTheme, setEquipSkinTheme] = useState<EquipSkinTheme[]>([]);
    const [equipType, setEquipType] = useState<EquipType[]>([]);

    useEffect(() => {
        Promise.all([
            fetchEquipSkin(region),
            fetchEquipSkinTheme(region),
            fetchEquipType(region),
        ]).then(([equipSkins, equipSkinThemes, equipTypes]) => {
            setEquipSkin(equipSkins);
            setEquipSkinTheme(equipSkinThemes);
            setEquipType(equipTypes);
        });
    }, [region]);

    if (equipSkinTheme.length === 0) {
        return <>Loading data</>;
    }

    const latestTheme = Math.max(
        ...equipSkinTheme.map((theme) => theme.id).filter((id) => id !== 199)
    ).toString();

    const equipTypeInfo = new Map(
        equipType.map((eqType) => [eqType.equip_type, eqType])
    );

    return (
        <>
            <h1>{region} Equip Skin</h1>
            <br />
            <Accordion defaultActiveKey={latestTheme} flush alwaysOpen>
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

export default EquipSkinPage;
