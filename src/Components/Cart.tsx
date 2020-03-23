import React from "react";
import Header from "./Header";
import {
    Container,
    Grid,
    TextField,
    Box,
    makeStyles,
    createStyles,
    Typography,
} from "@material-ui/core";
import { State } from "../App";
import { useSelector } from "react-redux";
import { MenuItem } from "../Models";

const useStyles = makeStyles(theme =>
    createStyles({
        cartContainer: {
            margin: "20px 10px",
        },
        emptyCartMessage: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
        },
    })
);
export const Cart: React.FC = props => {
    const classes = useStyles();
    const cartItems = useSelector<State, MenuItem[]>(state => state.CartItems);

    const renderCartItem = (item: MenuItem, index: number) => {
        return (
            <React.Fragment key={index}>
                <Grid item xs={3}>
                    <Typography variant="h6">{item.name}</Typography>
                    <Typography component="p">{item.description}</Typography>
                </Grid>
                <Grid item xs={3}>
                    <TextField id="standard-basic" label="# of oders" />
                </Grid>
            </React.Fragment>
        );
    };

    const renderCartGrid = () => {
        if (cartItems.length === 0) {
            return (
                <Container>
                    <Box className={classes.emptyCartMessage}>
                        <Typography variant="h3"> 
                            Your cart is empty
                        </Typography>
                    </Box>
                </Container>
            );
        }
        return (
            <Container className={classes.cartContainer}>
                <Grid container>
                    {cartItems.map((item, index) =>
                        renderCartItem(item, index)
                    )}
                </Grid>
            </Container>
        );
    };

    return (
        <>
            <Header />
            {renderCartGrid()}
        </>
    );
};

export default Cart;
