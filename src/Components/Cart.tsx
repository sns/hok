import React from "react";
import Header from "./Header";
import Checkout from "./Checkout";
import {
    Container,
    Grid,
    Box,
    makeStyles,
    createStyles,
    Typography,
    Divider,
    TextField,
    Paper,
} from "@material-ui/core";
import {
    State,
    addToCart,
    removeFromCart,
    clearCart,
    MD_TAX_RATE,
} from "../App";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "../Models/CartItem";
import classNames from "classnames";
import { AddCircle, RemoveCircle, Delete } from "@material-ui/icons";

const useStyles = makeStyles(theme =>
    createStyles({
        // cartContainer: {
        //     width: "90%",
        //     marginTop: "20px",
        //     border: `1px solid ${theme.palette.divider}`,
        //     borderRadius: theme.shape.borderRadius,
        //     backgroundColor: theme.palette.background.paper,
        //     color: theme.palette.text.secondary,
        // },
        layout: {
            width: "auto",
            marginLeft: theme.spacing(2),
            marginRight: theme.spacing(2),
            [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
                width: 600,
                marginLeft: "auto",
                marginRight: "auto",
            },
        },
        paper: {
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(3),
            padding: theme.spacing(2),
            [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
                marginTop: theme.spacing(6),
                marginBottom: theme.spacing(6),
                padding: theme.spacing(3),
            },
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
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
        column: {
            overflow: "auto",
        },
        addressGrid: {
            height: "400px",
        },
        addressInput: {
            width: "100%",
        },
    })
);

export interface Props {
    isMobile?: boolean;
}

export const Cart: React.FC<Props> = props => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const cartItems = useSelector<State, CartItem[]>(state => state.cartItems);

    const renderCartItem = (cartItem: CartItem, index: number) => {
        return (
            <React.Fragment key={index}>
                <Grid
                    item
                    xs={2}
                    className={classNames(classes.centered, classes.column)}
                >
                    <Typography variant="h6">{cartItem.quantity}</Typography>
                </Grid>
                <Grid item xs={6} className={classes.column}>
                    <Typography variant="h6">{cartItem.item.name}</Typography>
                    <Typography component="p">
                        {cartItem.item.description}
                    </Typography>
                </Grid>
                <Grid
                    item
                    xs={2}
                    className={classNames(classes.centered, classes.column)}
                >
                    <Typography variant="h6">
                        {`$${(cartItem.quantity * cartItem.item.price).toFixed(
                            2
                        )}`}
                    </Typography>
                </Grid>
                <Grid
                    item
                    xs={2}
                    className={classNames(classes.centered, classes.column)}
                >
                    <Grid container>
                        <Grid item xs={6}>
                            <AddCircle
                                color="primary"
                                onClick={() =>
                                    dispatch(addToCart(cartItem.item))
                                }
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <RemoveCircle
                                color="primary"
                                onClick={() =>
                                    dispatch(removeFromCart(cartItem.item.id))
                                }
                            />
                        </Grid>
                    </Grid>
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
    };

    const renderFeeRow = (
        label: string,
        amount: string,
        renderClearIcon: boolean = false
    ) => {
        return (
            <React.Fragment>
                <Grid
                    item
                    xs={2}
                    className={classNames(classes.centered, classes.column)}
                >
                    {renderClearIcon && (
                        <Delete
                            onClick={() => dispatch(clearCart())}
                            color="secondary"
                        />
                    )}
                </Grid>
                <Grid item xs={6} className={classes.column}>
                    <Typography variant="h6">{label}</Typography>
                </Grid>
                <Grid
                    item
                    xs={2}
                    className={classNames(classes.centered, classes.column)}
                >
                    <Typography variant="h6">{`$${amount}`}</Typography>
                </Grid>
                <Grid item xs={2} />
            </React.Fragment>
        );
    };

    const renderCartGrid = () => {
        return (
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center">
                        Cart
                    </Typography>
                    <Grid container spacing={1}>
                        {cartItems.map((item, index) =>
                            renderCartItem(item, index)
                        )}
                        {renderFeeRow(
                            "SubTotal",
                            calculateSubTotal().toFixed(2)
                        )}
                        {renderFeeRow(
                            "Tax",
                            (calculateSubTotal() * MD_TAX_RATE).toFixed(2)
                        )}
                        {renderFeeRow(
                            "Total",
                            (calculateSubTotal() * (1 + MD_TAX_RATE)).toFixed(
                                2
                            ),
                            cartItems.length > 0
                        )}
                    </Grid>
                </Paper>
            </main>
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
                <Grid item xs={props.isMobile ? 12 : 12}>
                    {renderCartGrid()}
                </Grid>
                <Grid item xs={props.isMobile ? 12 : 12}>
                    <Checkout />
                </Grid>
            </Grid>
        </>
    );
};

export default Cart;
