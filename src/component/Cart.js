import React from 'react';

import { useSelector } from 'react-redux';

import Appbar from '../sharedComponent/Appbar';
import {Box} from '@mui/material';
import CartItem from './CartItem';

function Cart  ()  {
    const amount = useSelector( (state) => state.cart.totalQuantity)
    console.log(amount)
    return (
        <>
        <Appbar />

        <Box mt={10}>

        <h2>Cart: {amount} item</h2>

        <CartItem id={2} name={'habi'}/>
        </Box>

        </>
    )
}

export default Cart;