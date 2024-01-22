import React, { createContext, useReducer } from 'react';

// 5. the reducer - this is used to update the state, based on the action

export function AppReducer(state, action) {
    let newState = { ...state };

    switch (action.type) {
        case "ADD_QUANTITY":
            newState.expenses.forEach((expense) => {
                if (expense.name === action.payload.name) {
                    expense.quantity += action.payload.quantity;
                }
            });
            action.type = "DONE";
            return newState;
        case "REDUCE_QUANTITY":
            newState.expenses.forEach((expense) => {
                if (expense.name === action.payload.name) {
                    expense.quantity -= action.payload.quantity;
                }
                expense.quantity = expense.quantity < 0 ? 0 : expense.quantity;
            });
            action.type = "DONE";
            return newState;
        case "DELETE_ITEM":
            newState.expenses.forEach((expense) => {
                if (expense.name === action.payload.name) {
                    expense.quantity = 0;
                }
            });
            action.type = "DONE";
            return newState;
        case "CHANGE_LOCATION":
            newState.location = action.payload;
            action.type = "DONE";
            return newState;
        default:
            return state;
    }
}

// 1. sets the initial state when the app loads
const initialState = {
    expenses: [
        { id: "Shirt", name: 'Shirt', quantity: 0, unitPrice: 500 },
        { id: "Jeans", name: 'Jeans', quantity: 0, unitPrice: 300 },
        { id: "Dress", name: 'Dress', quantity: 0, unitPrice: 400 },
        { id: "Dinner set", name: 'Dinner set', quantity: 0, unitPrice: 600 },
        { id: "Bags", name: 'Bags', quantity: 0, unitPrice: 200 },
    ],
    CartValue: 0,
    Location: "￡",
};

// 2. creates the context this is the thing out components import and use to get the state
export const AppContext = createContext(initialState);

// 3. provider component - wraps the components we want to give access to the state
// accepts the children, which are the nested(wrapped) components
export function AppProvider(props) {
    // 4. sets up the app state. takes a reducer, and an initial state
    const [state, dispatch] = useReducer(AppReducer, initialState);

    const totalExpenses = state.expenses.reduce((total, item) => {
        return (total += item.unitPrice * item.quantity);
    }, 0);

    state.CartValue = totalExpenses;

    return (
        // @ts-ignore
        <AppContext.Provider
            value={{
                expenses: state.expenses,
                CartValue: state.CartValue,
                dispatch,
                Location: state.Location,
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
}