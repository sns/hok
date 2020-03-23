import React from "react";
import { Container, Hidden } from "@material-ui/core";
import { Header } from "./Header";
import MenuWeb from "./MenuWeb";
import MenuMobile from "./MenuMobile";

export const Menu: React.FC = () => {
    return (
        <>
            <Header />
            <Container>
                <Hidden xsDown>
                    <MenuWeb />
                </Hidden>
                <Hidden smUp>
                    <MenuMobile />
                </Hidden>
            </Container>
        </>
    );
};

export default Menu;
