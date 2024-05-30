import { createSlice } from '@reduxjs/toolkit';
import data from '../data.json';

const products = createSlice({
    name: 'products',
    initialState: data.products,
    reducers: {}
})

export default products.reducer