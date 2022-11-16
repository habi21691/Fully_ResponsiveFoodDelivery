import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    const data = {
      email: email,
    }
    try {
      
      const {respose} = await axios.post(
       "https://mernfood-delivery.onrender.com/api/sendMail",
       data
     ).then( (res)=>{
      return res.status(200).json(res.data)
     }).catch( (err) =>{
      console.log(err)
     })
     console.log(respose.data)
     
   } catch (error) {
     console.log(error)
   }
    };
    
    return (
    <div>
      <form >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <TextField
            type={"email"}
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <Button
            type="submit"
            style={{
              borderRadius: "2em",
              alignItem: "center",
              marginLeft: "2em",
              justifyContent: "center",
            }}
            variant="contained"
         onClick={handleSubmit}
          >
            Submit
          </Button>
        </Box>
      </form>
    </div>
  );
}

export default ForgotPassword;
