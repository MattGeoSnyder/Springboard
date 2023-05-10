import { createSlice } from '@reduxjs/toolkit';

export const cart = createSlice({
    name: 'cart',
    initialState: {
        products: {}, 
        total: 0 
    },
    reducers: {
        addnew: (state, action) => {
            const { id, name, price, description } = action.payload;
            state.products = {...state.products, [id]: {name, price, description, quantity: 1}}
            state.total += price;
        },
        addone: (state, action) => {
            const { id, price } = action.payload;
            state.products[id].quantity += 1;
            state.total += price;
        },
        removeone: (state, action) => {
            const {id, price} = action.payload;
            state.products[id].quantity -= 1;
            state.total -= price;

            if (state.products[id].quantity === 0) {
                delete state.products[id];
            }
        },
        remove: (state, action) => {
            const { id, price } = action.payload;
            const quantity = state.products[id].quantity;
            state.total -= price*quantity;
            delete state.products[id];
        }
    }
})

export const { addnew, addone, removeone, remove } = cart.actions;

export default cart.reducer;