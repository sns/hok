import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { AppBar, Toolbar, Button, IconButton, Typography, Badge } from "@material-ui/core";
import { ShoppingCart, Menu as MenuIcon } from "@material-ui/icons";
import { State } from "../App";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    })
);

export const Header = () => {
    const classes = useStyles();
    const cartItemsCount = useSelector<State, number>(s => s.CartItems.length);

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="menu"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        House Of Kabob
                    </Typography>                    
                    <Button color="inherit">Login</Button>
                    <Badge badgeContent={cartItemsCount} color="secondary">
                        <ShoppingCart />
                    </Badge>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Header;