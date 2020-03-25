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

export const MD_TAX_RATE = 0.06;

export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const CLEAR_CART = "CLEAR_CART";

export const addToCart = (item: MenuItem) => {
    return {
        type: ADD_TO_CART,
        payload: item,
    };
};

export const removeFromCart = (id: number) => {
    return {
        type: REMOVE_FROM_CART,
        payload: id,
    };
}

export const clearCart = () => {
    return {
        type: CLEAR_CART
    };
}

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
        case REMOVE_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.reduce((acc: CartItem[], ci: CartItem) => {
                    if(ci.item.id === action.payload) {
                        if(ci.quantity > 1) {
                            acc.push({
                                ...ci,
                                 quantity: ci.quantity-1,
                            });
                            return acc;
                        }
                        return acc;
                    }
                    acc.push(ci);
                    return acc;
                }, []),
            };
        case CLEAR_CART: {
            return {
                ...state,
                cartItems: [],
            }
        }
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
