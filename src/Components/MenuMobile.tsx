import React from "react";
import { Grid } from "@material-ui/core";
import { MenuItemCard } from "./MenuItemCard";

import { MenuItems, MenuItem } from "../Models/MenuItem";

export const Menu = () => {
    const renderMenuItem = (index: number, item: MenuItem) => {
        return (
            <Grid item key={index} xs={6}>
                <MenuItemCard item={item} />
            </Grid>
        );
    };

    return (
        <>
            <Grid container spacing={1}>
                {MenuItems.map((item, index) => renderMenuItem(index, item))}
            </Grid>
        </>
    );
};

export default Menu;
