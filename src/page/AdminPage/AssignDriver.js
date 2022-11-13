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
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";

const schema = yup.object().shape({
  fullname: yup
    .string()
    .required("Please enter the required field")
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
  username: yup
    .string()
    .email()
    .required("Email Require * "),
  password: yup.string().required("Password Require *"),
  phone_number: yup
    .number()
    .positive()
    .integer()
    .required("PhoneNumber Require *"),
});

function AssignDriver(props) {
  const [fullname, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] =useState('')
 

  
  const{
    register,
    handleSubmit,
    formState:{error}
  }= useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data1) =>{
   
    const data = {
        fullname: fullname,
        username: username,
        password: password,
        address: address,
        role: role
    }
    
await axios.post('', data).then( (res) => {

}).catch( (err) => {

})
    
   } 


  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose}>
        <DialogTitle>Driver Registeration</DialogTitle>
        <DialogContent>
          <TextField
          {...register('fullname')}
            label="FullName"
            fullWidth
            variant="standard"
            value={fullname}
            onChange={(event) => {
              setFullName(event.target.value);
            }}
          />
          <TextField
          {...register('username')}
            value={username}
            label="UserName"
            fullWidth
            variant="standard"
            onChange={(event) => {
              setUserName(event.target.value);
            }}
          />
          <TextField
          {...register('address')}
            label="address"
            variant="standard"
            value={address}
            fullWidth
          
            onChange={(event) => {
              setAddress(event.target.value);
            }}
          />

          <TextField
            {...register('password')}
            label="password"
            type={"password"}
            fullWidth
            variant="standard"
            value={password}
            onChange={(event) => {
              setPassword(event.target.password);
            }}
          />
           <TextField
            {...register('role')}
            label="password"
             hidden={true}
            fullWidth
            variant="standard"
            value={role}
            onChange={(event) => {
              setRole(event.target.role)
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit(onSubmit)}>Add Driver</Button>
          <Button onClick={props.handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AssignDriver;
