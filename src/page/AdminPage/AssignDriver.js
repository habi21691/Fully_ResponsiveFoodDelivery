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
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [phone_number, setPhone_Number] = useState("");
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
        phone_number: phone_number,
        password: password,
        role: role
    }
    
await axios.post('https://mernfood-delivery.onrender.com/api/Register', data).then( (res) => {

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
          {...register('password')}
            value={password}
            label="Password"
            fullWidth
            variant="standard"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
           <TextField
            {...register('role')}
            label="role"
          
            fullWidth
            variant="standard"
            value={role}
            onChange={(event) => {
              setRole(event.target.value)
            }}
          />
            <TextField
                  {...register("phone_number")}
                  fullWidth
                  variant="standard"
                  required
                  inputProps={{
                    maxLength: 10,
                    minLength: 10,
                    pattern: "[0-9]{10}",
                  }}
                  label="Phone_Number:"
                  type="tel"
                  value={phone_number}
                  onChange={(event) => {
                    setPhone_Number(event.target.value.trim());
                  }}
                />
                {/* {errors.phone_number && (
                  <p id="error">{errors.phone_number.message}</p>
                )} */}
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
