import React from "react";

import { Card, CardContent, Typography, CardMedia, CardActions, Button } from "@mui/material";

import { useSelector, useDispatch} from "react-redux";

 import { cartActions } from '../store/cart-slice';

function CartItem() {
  const cartItem = useSelector((state) => state.cart.itemList);
  // console.log(cartItem);
  const dispatch = useDispatch();
   const removeCart = () => {
     dispatch(cartActions.removeCart())
   }
  return (
    <>
      {cartItem &&
        cartItem.map((item, index) => (
          <Card
            key={index}
            sx={{
              display: "flex",
              justifyContent:'center',
              alignItem: 'center',
              "& > :not(style)": {
                m: 1,
                width: 80,
                height: 130,
              },
            }}
          >
            {/* <CardTitle>
 
             </CardTitle> */}
            <CardMedia
              component="img"
              height="120"
              image={
                "https://mernfood-delivery.onrender.com/api/image/" + item.image
              }
              alt="green iguana"
            />
            <CardContent key={index}>
              <Typography>Name :{item.name}</Typography>
              <Typography>Price: {item.price}</Typography>
              <Typography>ToatalPrice: {item.totalprice}</Typography>
              <Typography>Amount: {item.amount}</Typography>
            </CardContent>
              <CardActions>

              <Button onClick={removeCart}>Share</Button>
              </CardActions>
  
       
          </Card>
        ))}
      {/* <CardAction>
 
            </CardAction> */}
    </>
  );
}

export default CartItem;
