import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
    AppBar,
    Toolbar,
    Button,
    IconButton,
    Typography,
    Badge,
    Box,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Link,
} from "@material-ui/core";
import {
    ShoppingCart,
    Menu as MenuIcon,
    RestaurantMenu,
} from "@material-ui/icons";
import classNames from "classnames";
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
        loginButton: {
            marginRight: theme.spacing(2),
        },
        link: {
            display: "flex",
            color: "inherit",
        },
    })
);

export const Header = () => {
    const classes = useStyles();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const cartItemsCount = useSelector<State, number>(s => s.CartItems.length);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="menu"
                        onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                    >
                        <MenuIcon />
                        <Drawer
                            anchor="left"
                            open={isDrawerOpen}
                            onClose={toggleDrawer}
                        >
                            <List>
                                <ListItem
                                    onClick={toggleDrawer}
                                    color="secondary"
                                >
                                    <Link
                                        to="/"
                                        component={RouterLink}
                                        className={classes.link}
                                    >
                                        <ListItemIcon>
                                            <RestaurantMenu />
                                        </ListItemIcon>
                                        <ListItemText primary="Menu" />
                                    </Link>
                                </ListItem>
                                <ListItem
                                    onClick={toggleDrawer}
                                    color="secondary"
                                >
                                    <Link
                                        to="/cart"
                                        component={RouterLink}
                                        className={classes.link}
                                    >
                                        <ListItemIcon>
                                            <ShoppingCart />
                                        </ListItemIcon>
                                        <ListItemText primary="Checkout" />
                                    </Link>
                                </ListItem>
                            </List>
                        </Drawer>
                    </IconButton>
                    <Link
                        className={classNames(classes.title, classes.link)}
                        to="/"
                        component={RouterLink}
                    >
                        <Typography variant="h6">House Of Kabob</Typography>
                    </Link>
                    <Button color="inherit" className={classes.loginButton}>
                        Login
                    </Button>
                    <Link
                        to="/cart"
                        component={RouterLink}
                        className={classes.link}
                    >
                        <Badge badgeContent={cartItemsCount} color="secondary">
                            <Box>
                                <ShoppingCart />
                            </Box>
                        </Badge>
                    </Link>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Header;
