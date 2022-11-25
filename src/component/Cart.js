import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import Appbar from '../sharedComponent/Appbar';
import {Box} from '@mui/material';
import CartItem from './CartItem';
import { cartActions } from '../store/cart-slice'

function Cart  ()  {
    const amount = useSelector( (state) => state.cart.totalQuantity)
    console.log(amount)
    const dispatch = useDispatch();
    const showCart = () => {
        dispatch(cartActions.setShowCart())
    }
    return (
        <>
        <Appbar />

        <Box mt={10}>

        <h2>Cart: {amount} item</h2>
          {showCart}
        <CartItem id={2} name={'habi'}/>
        </Box>

        </>
    )
}

export default Cart;