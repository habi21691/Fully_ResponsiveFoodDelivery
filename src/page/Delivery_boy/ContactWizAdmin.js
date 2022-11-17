import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import {
  CardContent,
  TextField,
  Card,
  MenuItem,
  Typography,
} from "@mui/material";
import Appbar from "../../sharedComponent/Appbar";
import { PhoneRounded } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

const Schema = yup.object().shape({
  customername: yup
    .string()
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ")
    .required("customer name require"),
  address: yup
    .string()
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ")
    .required("address require *"),
  phonenumber: yup
    .number()
    .positive()
    .integer()
    .required("Phone Number Require *"),
  status: yup.string().required("status require *"),
});
function ContactWizAdmin() {
  const [status, setStatus] = useState("");
  const [customername, setcustomername] = useState("");
  const [address, setAddress] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(Schema),
  });

  async function onSubmit(data1) {
    console.log(data1);
    const data ={
      customername: customername,
      address: address,
      phonenumber: phonenumber,
      status: status
    }
    await axios.post('https://mernfood-delivery.onrender.com/api/getfeadbackfromDelivery',data).then( (response) =>{
      return response
    }).catch( (errors) => {
      console.log(errors)
    })
  }

  return (
    <div>
      <form>
        <Appbar />
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          direction="column"
          alignItems="center"
          justify="center"
          // style={{ minHeight: '100vh' }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Card
            sx={{ mt: 20, minWidth: 100, maxWidth: 300 }}
            style={{
              display: "grid",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <CardContent>
              <Typography gutterBottom variant="h5">
                Send Message For The Reastorant
              </Typography>
              <TextField
                fullWidth
                inputProps={{ minLength: 6, maxLength: 20 }}
                {...register("customername")}
                placeholder="Enter the Customer Full Name"
                value={customername}
                onChange={(event) => {
                  setcustomername(event.target.value);
                }}
              />
              {errors.customername && (
                <p id="error">{errors.customername.message}</p>
              )}
              <TextField
                fullWidth
                {...register("address")}
                sx={{ mt: 3 }}
                inputProps={{ minLength: 6, maxLength: 10 }}
                placeholder="Enter the Customer Address"
                value={address}
                onChange={(event) => {
                  setAddress(event.target.value);
                }}
              />
              {errors.address && <p id="error">{errors.address.message}</p>}
              <TextField
                fullWidth
                sx={{ mt: 3 }}
                inputProps={{ minLength: 10, maxLength: 10 }}
                {...register("phonenumber")}
                placeholder={"Enter the Customer Phone Number"}
                value={phonenumber}
                onChange={(event) => setPhoneNumber(event.target.value)}
              />
              {errors.phonenumber && (
                <p id="error">{errors.phonenumber.message}</p>
              )}
              <TextField
                value={status}
                label="status"
                select
                {...register("status")}
                sx={{ mt: 3 }}
                fullWidth
                onChange={(event) => {
                  setStatus(event.target.value);
                }}
              >
                <MenuItem value={"delivered"}>Delivered</MenuItem>
                <MenuItem value={"not deliver"}>Not Deliver</MenuItem>
                <MenuItem value={"On The Way"}>On The Way</MenuItem>
              </TextField>
                   {errors.status && <p id={'error'}>{errors.status.message}</p>}
              <Button
                variant="contained"
                fullWidth
                sx={{ mt: 3 }}
                onClick={handleSubmit(onSubmit)}
              >
                Send
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </form>
    </div>
  );
}

export default ContactWizAdmin;
