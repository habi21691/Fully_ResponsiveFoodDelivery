import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name:'cart',
    initialState: {
        itemList: [],
        totalQuantity: 0,
        showCart: false
    },
    reducers: {
        addCart(state, action){
             const newItem = action.payload;
             const exitingItem = state.itemList.find((item) => item._id === newItem._id )
             if(exitingItem){
                exitingItem.amount++;
                exitingItem.totalprice += newItem.price
             }
             else{
                state.itemList.push({
                    _id: newItem._id,
                    name: newItem.name,
                    price: newItem.price,
                    image: newItem.image,
                    amount: 1,
                    totalprice: newItem.price
                })
                state.totalQuantity++;
             }
        },
        removeCart( state, action){
            state.change = true
         const id = action.payload;
         const existingItem = state.itemsList.find((item) => item.id === id);
      if (existingItem.quantity === 1) {
        state.itemsList = state.itemsList.filter((item) => item.id !== id);
        state.totalQuantity--;
      } else {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
      }
        },
        setshowCart(state){
            state.setshowCart = !state.setshowCart
        }
    }
})
export const cartActions = cartSlice.actions;
export default cartSlice;