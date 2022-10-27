import React from "react";
import { useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {Snackbar, Alert} from "@mui/material";

const Schema = yup.object().shape({
  name: yup.string().required("Food Name Require*"),
  amount: yup
    .number()
    .integer()
    .positive()
    .required("Amount Require *"),
});

function EditingCustomerOrder(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(Schema),
  });

  const onSubmit = async (_id) => {
    // console.log({_id: einput._id})
    console.log(props.einput._id);
    const data = {
      name: props.einput.name,
      amount: props.einput.amount,
    };
    axios
      .put("http://localhost:5000/api/EditingOrder/" + props.einput._id, {
        data,
      })
      .then((data) => {
        console.log(data.data);
        if(data.status === 200 ){
          props.setTakeOrderOpen(true)
        }
      });
    

  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Dialog open={props.modalofEdit} onClose={props.handleClose}>
      <Snackbar
          open={props.takeorderOpen}
          onClose={() => {
            props.handleClose();
        
          }}
          autoHideDuration={2000}
        >
          <Alert
            onClose={props.handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Updated Successfully!!
          </Alert>
        </Snackbar>
        <DialogTitle>Editign Customer Order </DialogTitle>
        <DialogContent>
          <TextField
            {...register("name")}
            autoFocus
            inputProps={{ maxLength: 10, minLength: 2 }}
            margin="dense"
            value={props.einput.name}
            onChange={(event) => {
              props.setEInput({ ...props.einput, name: event.target.value });
            }}
            label="Food Name"
            fullWidth
            variant="standard"
          />
         {errors.name && <p id='error'>{errors.name.message}</p>}
          <TextField
            {...register("amount")}
            autoFocus
            inputProps={{ maxLength: 2 }}
            margin="dense"
            value={props.einput.amount}
            onChange={(event) => {
              props.setEInput({ ...props.einput, amount: event.target.value });
            }}
            label="Amount"
            type="number"
            fullWidth
            variant="standard"
          />
          {errors.amount && <p id="error">{errors.amount.message}</p>}
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>Cancel</Button>
          <Button type="submit" onClick={handleSubmit(onSubmit)}>Edit</Button>
        </DialogActions>
      </Dialog>
    </form>
  );
}

export default EditingCustomerOrder;
