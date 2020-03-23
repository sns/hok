import React from "react";
import {
    Card,
    CardMedia,
    CardContent,
    CardActions,
    CardHeader,
    Button,
    Typography,
} from "@material-ui/core";

import { MenuItem } from "../Models/MenuItem";
import { useDispatch } from "react-redux";
import { addToCart } from "../App";

export interface Props {
    item: MenuItem;
}

export const MenuItemCard: React.FC<Props> = props => {
    const dispatch = useDispatch();
    
    const add = () => {
        dispatch(addToCart(props.item));
    };
    return (
        <Card key={props.item.id}>
            <CardHeader
                title={props.item.name}
                subheader={`$${props.item.price}`}
                titleTypographyProps={{ variant: "h6" }}
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    Famous Persian ground beef kabob with a hint of onion
                    flavor.
                </Typography>
            </CardContent>
            <CardMedia
                image="./kabob1.jpg"
                title="kabob"
                style={{ height: 200 }}
            />
            <CardActions>
                <Button size="small" color="primary" onClick={add}>
                    Add To Cart
                </Button>
            </CardActions>
        </Card>
    );
};
