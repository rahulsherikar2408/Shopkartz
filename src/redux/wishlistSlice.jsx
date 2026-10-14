import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem('user')
    ? (JSON.parse(localStorage.getItem('wishlist')) ?? [])
    : [];

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        addToWishlist(state, action) {
            const user = localStorage.getItem('user');
            if (!user) {
                return;
            }
            const exists = state.some(item => (item.id || item.title) === (action.payload.id || action.payload.title));
            if (!exists) {
                state.push(action.payload);
            }
        },
        deleteFromWishlist(state, action) {
            return state.filter(item => (item.id || item.title) !== (action.payload.id || action.payload.title));
        },
        clearWishlist() {
            return [];
        },
        setWishlist(state, action) {
            return Array.isArray(action.payload) ? action.payload : [];
        }
    },
});

export const { addToWishlist, deleteFromWishlist, clearWishlist, setWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
