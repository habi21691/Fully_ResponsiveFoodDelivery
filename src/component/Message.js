import React, { useState } from "react";
import Box from "@mui/material/Box";
import ReplyIcon from "@mui/icons-material/Reply";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Snackbar, Alert } from "@mui/material";

function Message() {
  const [open, setOpen] = useState(false);
  const [replay, setReplay] = useState("");

  const handleSubmit = () => {
    const data = {
      replay: replay,
    };
   setOpen(true)
 
    console.log(data);
  };
  
  function handleClose  ()  {
    setOpen(false);
  };


  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "#f792ee",
          boxShadow: "0 1px 0 0 rgba(170,170,170,0.01)",
        }}
      >
        <FormControl variant="standard" sx={{ m: 1, width: 250 }}>
          <InputLabel id="demo-simple-select-label">Message replay</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={replay}
            required
            onChange={(event) => {
              setReplay(event.target.value);
            }}
          >
            <MenuItem value={"Reached"}>I have it. Thanks</MenuItem>
            <MenuItem value={"No"}>I didn't have it!!</MenuItem>
          </Select>
        </FormControl>
        <Button onClick={handleSubmit} onClose={handleClose}>
          <ReplyIcon />
        </Button>

      </Box>
      <Snackbar open={open}  autoHideDuration={2000}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Message Sent!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Message;
