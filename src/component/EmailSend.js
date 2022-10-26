import { TextField,Button } from "@mui/material";
import React from "react";
import Appbar from "../sharedComponent/Appbar";

export default function EmailSend() {
  const handleSubmit = async (event) => {
   event.preventDefault();
   const data = {
        
   }

   
  };
  return (
    <div>
      {/* <Appbar/> */}

      <TextField placeholder="Enter Your username" name="user"></TextField>
      <Button type="submit" onClick={handleSubmit}>
        Send
      </Button>
    </div>
  );
}
