import React from "react";
import { Container, Hidden, createStyles, makeStyles } from "@material-ui/core";
import { Header } from "./Header";
import MenuGrid from "./MenuGrid";

const useStyles = makeStyles(theme => createStyles({
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "20px",
    }

}));

export const Menu: React.FC = () => {
    const classes = useStyles();
    return (
        <>
            <Header />
            <Container className={classes.container}>
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
