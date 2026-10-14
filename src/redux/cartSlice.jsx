import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem('user')
    ? (JSON.parse(localStorage.getItem('cart')) ?? [])
    : [];

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            const user = localStorage.getItem('user');
            if (!user) {
                return;
            }
            state.push(action.payload);
        },
        deleteFromCart(state, action) {
            return state.filter(item => item.id != action.payload.id);
        },
        clearCart() {
            return [];
        },
        setCart(state, action) {
            return Array.isArray(action.payload) ? action.payload : [];
        }
    },
})

export const { addToCart, deleteFromCart, clearCart, setCart } = cartSlice.actions;

export default cartSlice.reducer;