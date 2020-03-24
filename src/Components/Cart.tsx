import React from "react";
import Header from "./Header";
import {
    Container,
    Grid,
    Box,
    makeStyles,
    createStyles,
    Typography,
    Divider,
} from "@material-ui/core";
import { State } from "../App";
import { useSelector } from "react-redux";
import CartItem from "../Models/CartItem";
import classNames from "classnames";

const MD_TAX_RATE = 0.06;
const useStyles = makeStyles(theme =>
    createStyles({
        cartContainer: {
            width: "90%",
            marginTop: "20px",
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
        divider: {
            width: "100%",
        },
        centered: {
            display:"flex",
            alignItems: "center",
            justifyContent: "center",
        },
        column: {
            overflow: "auto",
        }
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
                <Grid item xs={2} className={classNames(classes.centered, classes.column)}>
                    <Typography variant="h6">{cartItem.quantity}</Typography>
                </Grid>
                <Grid item xs={7} className={classes.column}>
                    <Typography variant="h6">{cartItem.item.name}</Typography>
                    <Typography component="p">
                        {cartItem.item.description}
                    </Typography>
                </Grid>
                <Grid item xs={3} className={classNames(classes.centered, classes.column)}>
                    <Typography variant="h6">
                        {`$${cartItem.quantity * cartItem.item.price}`}
                    </Typography>
                </Grid>
                <Divider className={classes.divider} />
            </React.Fragment>
        );
    };

    const calculateSubTotal = () => {
        return cartItems.reduce((subTotal, cartItem) => {
            subTotal += cartItem.quantity * cartItem.item.price;
            return subTotal;
        }, 0);
    }

    const renderSubTotalRow = () => {
        return (
            <React.Fragment>
                <Grid item xs={2} className={classNames(classes.centered, classes.column)}/>
                <Grid item xs={7} className={classes.column}>
                    <Typography variant="h6">SubTotal</Typography>
                </Grid>
                <Grid item xs={3} className={classNames(classes.centered, classes.column)}>
                    <Typography variant="h6">{`$${calculateSubTotal().toFixed(2)}`}</Typography>
                </Grid>
            </React.Fragment>
        );
    }

    const renderTaxRow = () => {
        return (
            <React.Fragment>
                <Grid item xs={2} className={classNames(classes.centered, classes.column)}/>
                <Grid item xs={7} className={classes.column}>
                    <Typography variant="h6">Tax</Typography>
                </Grid>
                <Grid item xs={3} className={classNames(classes.centered, classes.column)}>
                    <Typography variant="h6">{`$${(calculateSubTotal() * MD_TAX_RATE).toFixed(2) }`}</Typography>
                </Grid>
            </React.Fragment>
        );
    }

    const renderTotalRow = () => {
        return (
            <React.Fragment>
                <Grid item xs={2} className={classNames(classes.centered, classes.column)} />
                <Grid item xs={7} className={classes.column}>
                    <Typography variant="h6">Total</Typography>
                </Grid>
                <Grid item xs={3} className={classNames(classes.centered, classes.column)}>
                    <Typography variant="h6">{`$${(
                        calculateSubTotal() *
                        (1 + MD_TAX_RATE)
                    ).toFixed(2)}`}</Typography>
                </Grid>
            </React.Fragment>
        );
    }

    const renderCartGrid = () => {
        return (
            <Container className={classNames(classes.cartContainer, classes.centered)} maxWidth="sm">
                <Grid container spacing={1}>
                    {cartItems.map((item, index) =>
                        renderCartItem(item, index)
                    )}
                    {renderSubTotalRow()}
                    {renderTaxRow()}
                    {renderTotalRow()}
                </Grid>
            </Container>
        );
    };

    if (cartItems.length === 0) {
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
                <Grid item xs={props.isMobile ? 12 : 6}>
                    {renderCartGrid()}
                </Grid>
                <Grid item xs={props.isMobile ? 12 : 6}>
                    <Box>Payment info</Box>
                </Grid>
            </Grid>
        </>
    );
};

export default Cart;
