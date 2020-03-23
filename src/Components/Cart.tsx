import React from "react";
import Header from "./Header";
import { Container } from "@material-ui/core";

export const Cart: React.FC = props => {
    return (
        <>
            <Header />
            <Container>
                Cart
            </Container>
        </>
    );
};

export default Cart;
