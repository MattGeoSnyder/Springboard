import { createSlice } from '@reduxjs/toolkit';

const cart = createSlice({
    name: 'cart',
    initialState: {
        products: {}, 
        total: 0 
    },
    reducers: {
        addNew: (state, payload) => {
            state.products[payload.id] = { name: payload.name, 
                                price: payload.price, 
                                description: payload.description,
                                quantity: 1}
            state.total += payload.price;
        },
        remove: (state, payload) => {
            delete state[payload.id];
            state.total -= payload.price;
        }
    }
})

export const { addNew, remove } = cart.actions;

export default cart.reducer;