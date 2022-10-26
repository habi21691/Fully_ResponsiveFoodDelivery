import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Schema = yup.object().shape({
  fullname: yup.string().required("FullName Require *"),
  address: yup.string().required("Address Require *"),
  name: yup.string().required("Food Name Require*"),
  phonenumber: yup
    .number()
    .positive()
    .integer()

    .required("phoneNumber is Required"),
});

function TakeOrderFromCustomer(props) {
  const [fullname, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState(1);
  const [name, setName] = useState("");
  const [phonenumber, setPhoneNuber] = useState("");

  function onSubmit(data3) {
    console.log(data3);
    const data = {
      fullname: fullname,
      address: address,
      amount: amount,
      name: name,
      phonenumber: phonenumber,
    };

    axios.post("http://localhost:5000/api/TakeOrdering", data).then((data) => {
      console.log(data);
      console.log(data.status);
      if (data.status === 200) {
        //  prpos.TakingOrderByOperater();
      }
    });
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(Schema),
  });

  return (
    <Dialog open={props.show} onClose={props.handleClose}>
      {/* <Snackbar
          open={takeorderOpen}
          onClose={() => {
            handleClose();
        
          }}
          autoHideDuration={2000}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Successfully Ordered!!
          </Alert>
        </Snackbar> */}
      <DialogTitle>Take Order From the Customer</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <TextField
            {...register("fullname")}
            inputProps={{ maxLength: 25, minLength: 7 }}
            fullWidth
            variant="standard"
            value={fullname}
            label="FullName:"
            onChange={(event) => {
              setFullName(event.target.value);
            }}
          />
          {errors.fullname && <p id="error">{errors.fullname.message}</p>}{" "}
          <TextField
            {...register("address")}
            inputProps={{ maxLength: 12, minLength: 4 }}
            fullWidth
            variant="standard"
            value={address}
            label="Address:"
            onChange={(event) => {
              setAddress(event.target.value);
            }}
          />
          {errors.address && <p id="error">{errors.address.message}</p>}{" "}
          <TextField
            {...register("name")}
            inputProps={{ maxLength: 20, minLength: 4 }}
            fullWidth
            variant="standard"
            value={name}
            label="FoodName:"
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          {errors.name && <p id="error">{errors.name.message}</p>}{" "}
          <TextField
            fullWidth
            variant="standard"
            value={amount}
            label="Amount:"
            onChange={(event) => {
              setAmount(event.target.value);
            }}
          />
          <TextField
            {...register("phonenumber")}
            inputProps={{ maxLength: 10, minLength: 10 }}
            fullWidth
            variant="standard"
            value={phonenumber}
            label="phonenumber:"
            onChange={(event) => {
              setPhoneNuber(event.target.value);
            }}
          />
          {errors.phonenumber && <p id="error">{errors.phonenumber.message}</p>}{" "}
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>Cancel</Button>
          <Button type="submit">Order</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default TakeOrderFromCustomer;
