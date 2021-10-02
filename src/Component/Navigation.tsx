import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

import Region from "../Data/Schema/Region";

const Navigation = ({ region }: { region: Region }) => {
    const location = useLocation();

    const NavPage = ({
        path,
        description,
    }: {
        path: string;
        description: string;
    }) => {
        const route = `/${region}/${path}`;
        return (
            <Nav.Link as={Link} to={route} eventKey={route}>
                {description}
            </Nav.Link>
        );
    };

    return (
        <Navbar>
            <Container>
                <Navbar.Brand as={Link} to={`/${region}`}>
                    Cereal AL DB
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav activeKey={location.pathname}>
                        <NavPage path="equip-skin" description="Equip Skin" />
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;
