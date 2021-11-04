import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import {
    BrowserRouter,
    Route,
    Routes,
    Navigate,
    useParams,
} from "react-router-dom";

import Navigation from "./Component/Navigation";
import Region from "./Data/Schema/Region";
import EquipSkinPage from "./Page/EquipSkin";
import FurniturePage from "./Page/Furniture";
import HomePage from "./Page/HomePage";

const AppRegion = () => {
    const { pRegion } = useParams();
    const region = (pRegion ?? Region.EN) as Region;
    const knownRegion = Object.values<Region>(Region).includes(region);

    const knownRegionRoutes = (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
                path="equip-skin"
                element={<EquipSkinPage region={region} />}
            />
            <Route
                path="furniture"
                element={<FurniturePage region={region} />}
            />
        </Routes>
    );

    return (
        <>
            <Navigation region={knownRegion ? region : Region.EN} />
            <Container>
                {knownRegion ? (
                    knownRegionRoutes
                ) : (
                    <h1>Unknown Region {region}</h1>
                )}
            </Container>
            <br />
        </>
    );
};

function App() {
    return (
        <BrowserRouter basename="/db">
            <Routes>
                <Route path="/" element={<Navigate to="/EN" />} />
                <Route path=":pRegion/*" element={<AppRegion />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
