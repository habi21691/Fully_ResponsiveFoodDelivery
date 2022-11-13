import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { useState } from "react";

function AssignDriver(props) {
  const [fullname, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose}>
        <DialogTitle>Driver Registeration</DialogTitle>
        <DialogContent>
          <TextField
            label="FullName"
            fullWidth
            variant="standard"
            value={fullname}
            onChange={(event) => {
              setFullName(event.target.value);
            }}
          />
          <TextField
            value={username}
            label="UserName"
            fullWidth
            variant="standard"
            onChange={(event) => {
              setUserName(event.target.value);
            }}
          />
          <TextField
            label="address"
            variant="standard"
            value={address}
            fullWidth
          
            onChange={(event) => {
              setAddress(event.target.value);
            }}
          />

          <TextField
            label="password"
            type={"password"}
            fullWidth
            variant="standard"
            value={password}
            onChange={(event) => {
              setPassword(event.target.password);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button>Add Driver</Button>
          <Button onClick={props.handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AssignDriver;
