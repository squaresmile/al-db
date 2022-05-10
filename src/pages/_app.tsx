import type { AppProps } from "next/app";
import { Container } from "react-bootstrap";

import Layout from "../components/layout";

import "bootstrap/dist/css/bootstrap.min.css";

import "./styles.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <Layout>
            <Container>
                <Component {...pageProps} />
            </Container>
        </Layout>
    );
};

export default MyApp;
