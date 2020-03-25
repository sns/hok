import React from "react";
import {
    Typography,
    makeStyles,
    List,
    ListItem,
    ListItemText,
    Grid,
} from "@material-ui/core";
import { State, MD_TAX_RATE } from "../App";
import { useSelector } from "react-redux";
import CartItem from "../Models/CartItem";

const addresses = [
    "1 Material-UI Drive",
    "Reactville",
    "Anytown",
    "99999",
    "USA",
];
const payments = [
    { name: "Card type", detail: "Visa" },
    { name: "Card holder", detail: "Mr John Smith" },
    { name: "Card number", detail: "xxxx-xxxx-xxxx-1234" },
    { name: "Expiry date", detail: "04/2024" },
];

const useStyles = makeStyles(theme => ({
    listItem: {
        padding: theme.spacing(1, 0),
    },
    total: {
        fontWeight: 700,
    },
    title: {
        marginTop: theme.spacing(2),
    },
}));

export const Review: React.FC = () => {
    const classes = useStyles();
    const cartItems = useSelector<State, CartItem[]>(state => state.cartItems);

    const calculateSubtotal = () => {
        return cartItems.reduce((subTotal, cartItem) => {
            subTotal += cartItem.quantity * cartItem.item.price;
            return subTotal;
        }, 0);
    }

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Order summary
            </Typography>
            <List disablePadding>
                <ListItem className={classes.listItem}>
                <ListItemText primary="Subtotal" />
                <Typography variant="subtitle1" className={classes.total}>
                    {`$${calculateSubtotal().toFixed(2)}`}
                </Typography>
            </ListItem>
                <ListItem className={classes.listItem}>
                    <ListItemText primary="Tax" />
                    <Typography variant="subtitle1" className={classes.total}>
                    {`$${(calculateSubtotal() * MD_TAX_RATE).toFixed(2)}`}
                    </Typography>
                </ListItem>                
                <ListItem className={classes.listItem}>
                    <ListItemText primary="Total" />
                    <Typography variant="subtitle1" className={classes.total}>
                    {`$${(calculateSubtotal() * (1 + MD_TAX_RATE)).toFixed(2)}`}
                    </Typography>
                </ListItem>
            </List>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography
                        variant="h6"
                        gutterBottom
                        className={classes.title}
                    >
                        Shipping
                    </Typography>
                    <Typography gutterBottom>John Smith</Typography>
                    <Typography gutterBottom>{addresses.join(", ")}</Typography>
                </Grid>
                <Grid item container direction="column" xs={12} sm={6}>
                    <Typography
                        variant="h6"
                        gutterBottom
                        className={classes.title}
                    >
                        Payment details
                    </Typography>
                    <Grid container>
                        {payments.map(payment => (
                            <React.Fragment key={payment.name}>
                                <Grid item xs={6}>
                                    <Typography gutterBottom>
                                        {payment.name}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography gutterBottom>
                                        {payment.detail}
                                    </Typography>
                                </Grid>
                            </React.Fragment>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default Review;
