import Link from "next/link";
import { useRouter } from "next/router";
import { Container, Nav, Navbar } from "react-bootstrap";

const Navigation = () => {
    const router = useRouter();
    const region = router.query.region ?? "EN";

    const NavPage = ({
        path,
        description,
    }: {
        path: string;
        description: string;
    }) => {
        const route = `/${region}/${path}`;
        return (
            <Nav.Link eventKey={route} as={Link} href={route}>
                {description}
            </Nav.Link>
        );
    };

    return (
        <Navbar>
            <Container>
                <Navbar.Brand as={Link} href={`/${region}`}>
                    Cereal AL DB
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav activeKey={router.asPath.split("#")[0]}>
                        <NavPage path="equip-skin" description="Equip Skin" />
                        <NavPage path="furniture" description="Furniture" />
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;
