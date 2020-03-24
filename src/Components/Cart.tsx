import React from "react";
import Header from "./Header";
import {
    Container,
    Grid,
    Box,
    makeStyles,
    createStyles,
    Typography,
} from "@material-ui/core";
import { State } from "../App";
import { useSelector } from "react-redux";
import CartItem from "../Models/CartItem";

const useStyles = makeStyles(theme =>
    createStyles({
        cartContainer: {
            margin: "20px 10px",
            width: 'fit-content',
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: theme.shape.borderRadius,
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.secondary,
        },
        emptyCartMessage: {
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: theme.palette.text.secondary,
        },
    })
);

export interface Props {
    isMobile?: boolean;
}

export const Cart: React.FC<Props> = props => {
    const classes = useStyles();
    const cartItems = useSelector<State, CartItem[]>(state => state.cartItems);

    const renderCartItem = (cartItem: CartItem, index: number) => {
        return (
            <React.Fragment key={index}>
                <Grid item xs={2}>
                    <Typography component="h6">{cartItem.quantity}</Typography>
                </Grid>
                <Grid item xs={8}>
                    <Typography variant="h6">{cartItem.item.name}</Typography>
                    <Typography component="p">
                        {cartItem.item.description}
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography component="h6">
                        {`$${cartItem.quantity * cartItem.item.price}`}
                    </Typography>
                </Grid>
            </React.Fragment>
        );
    };

    const renderCartGrid = () => {
        return (
            <>
                <Container className={classes.cartContainer}>
                    <Grid container spacing={2}>
                        {cartItems.map((item, index) =>
                            renderCartItem(item, index)
                        )}
                    </Grid>
                </Container>
            </>
        );
    };

    if(cartItems.length === 0) {
        return (
            <>
                <Header />
                <Container className={classes.emptyCartMessage}>
                    <Typography variant="h6">Your cart is empty</Typography>
                </Container>
            </>
        );
    }

    return (
        <>
            <Header />
            <Grid container>
                <Grid item xs={6} >
                    <Box>Payment info</Box>
                </Grid>
                <Grid item xs={6}>
                    {renderCartGrid()}
                </Grid>
            </Grid>
        </>
    );
};

export default Cart;
