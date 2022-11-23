import React from "react";

import { Card, CardContent, Typography, CardMedia } from "@mui/material";

import { useSelector } from "react-redux";
function CartItem() {
  const cartItem = useSelector((state) => state.cart.itemList);
  console.log(cartItem);
  return (
    <>
      {cartItem &&
        cartItem.map((item, index) => (
          <Card
            key={index}
            sx={{
              display: "flex",
              "& > :not(style)": {
                m: 1,
                width: 130,
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
          </Card>
        ))}
      {/* <CardAction>
 
            </CardAction> */}
    </>
  );
}

export default CartItem;
