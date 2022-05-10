import { GetStaticPaths, GetStaticProps } from "next";

import Region from "../../data/Schema/Region";
import HomePage from "../index";

export const getStaticPaths: GetStaticPaths = () => {
    return {
        paths: Object.values(Region).map((region) => {
            return { params: { region } };
        }),
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps = () => {
    return { props: {} };
};

export default HomePage;
