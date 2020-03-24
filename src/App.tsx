import React from "react";
import "./App.css";

import { Menu } from "./Components/Menu";
import { MenuItem } from "./Models";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Cart from "./Components/Cart";
import CartItem from "./Models/CartItem";
import { Hidden } from "@material-ui/core";

export interface State {
    cartItems: CartItem[];
}

const initialState = {
    cartItems: [],
};

export const ADD_TO_CART = "ADD_TO_CART";

export const addToCart = (item: MenuItem) => {
    return {
        type: ADD_TO_CART,
        payload: item,
    };
};

const rootReducer = (state: State = initialState, action: any): State => {
    switch (action.type) {
        case ADD_TO_CART:
            const menuItem: MenuItem = action.payload;
            const updatedCartItems = state.cartItems.findIndex(x => x.item.id === menuItem.id) === -1
                ? [...state.cartItems, {item: menuItem, quantity: 1}]
                : state.cartItems.map(x => x.item.id === menuItem.id ? {...x, quantity: x.quantity + 1} : x);

            return {
                ...state,
                cartItems: updatedCartItems,
            };
        default:
            return state;
    }
};

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware()));

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact>
                        <Menu />
                    </Route>
                    <Route path="/cart">
                        <Hidden xsDown>
                            <Cart />
                        </Hidden>
                        <Hidden smUp>
                            <Cart isMobile={true}/>
                        </Hidden>
                    </Route>
                </Switch>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
