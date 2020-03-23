import React from "react";
import "./App.css";

import { Menu } from "./Components/Menu";
import { MenuItem } from "./Models";

import { Provider } from "react-redux";
import { createStore } from "redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Cart from "./Components/Cart";

export interface State {
    CartItems: MenuItem[];
}

const initialState = {
    CartItems: [],
};

export const ADD_TO_CART = "ADD_TO_CART";

export const addToCart = (item: MenuItem) => {
    return {
        type: ADD_TO_CART,
        payload: item,
    };
};

const rootReducer = (state: State = initialState, action: any) => {
    switch (action.type) {
        case ADD_TO_CART:
            return {
                ...state,
                CartItems: [...state.CartItems, action.payload],
            };
        default:
            return state;
    }
};

const store = createStore(rootReducer);

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact>
                        <Menu />
                    </Route>
                    <Route path="/cart">
                        <Cart />
                    </Route>
                </Switch>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
