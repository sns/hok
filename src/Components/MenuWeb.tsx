import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { MenuItemCard } from "./MenuItemCard";

import { MenuItems, MenuItem } from "../Models/MenuItem";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: "center",
            color: theme.palette.text.secondary,
        },
    })
);

export const Menu = () => {
    const classes = useStyles();

    const renderMenuItem = (index: number, item: MenuItem) => {
        return (
            <Grid item key={index} xs={3}>
                <MenuItemCard item={item} />
            </Grid>
        );
    };

    return (
        <Grid container spacing={1} className={classes.root}>
            {MenuItems.map((item, index) => renderMenuItem(index, item))}
        </Grid>
    );
};

export default Menu;
