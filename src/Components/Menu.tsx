import React from "react";
import { Container, Hidden } from "@material-ui/core";
import { Header } from "./Header";
import MenuGrid from "./MenuGrid";

export const Menu: React.FC = () => {
    return (
        <>
            <Header />
            <Container>
                <Hidden xsDown>
                    <MenuGrid />
                </Hidden>
                <Hidden smUp>
                    <MenuGrid isMobile={true}/>
                </Hidden>
            </Container>
        </>
    );
};

export default Menu;
