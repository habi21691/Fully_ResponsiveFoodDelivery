import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import axios from "axios";
import MuiAlert from "@mui/material/Alert";
import { CircularProgress } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {Stack} from "@mui/material";
import * as yup from "yup";
import { SettingsInputSvideoSharp } from "@mui/icons-material";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const schema = yup.object().shape({
  fullname: yup.string().required("Fullname Require *"),
  username: yup.string().email().required("Email Require * "),
  password: yup.string().required("Password Require *"),
  phone_number: yup
    .number()
    .positive()
    .integer()
    .required("PhoneNumber Require *"),
});

function Registration() {
  const [fullname, setFullName] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [phone_number, setPhone_Number] = useState("");

  const [isSubmmiting, setIsSubmmiting] = useState(false);

  const [open, setOpen] = useState(false);

  const [err, setErr] = useState(true);
 
  const closeSnackbar = () => {
    setOpen(false);
  };
  const handleModal = () => {
    setOpen(true)
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit =  (data1) => {
    console.log(data1);
    setIsSubmmiting(true);
    // setOpen(true);
    handleModal()
     

    const data = {
      fullname: fullname,
      username: username,
      password: password,
      phone_number: phone_number,
    };
  
 
    

     axios
      .post("https://mernfood-delivery.onrender.com/api/Register", data)
      .then( function (data) {
        console.log(data.status)
        setErr(false)
      }).catch( function (err) {
        setIsSubmmiting(false)
        setErr(false)
      })
      // setErr(true);
    setIsSubmmiting(false);
    console.log(err)
  };

  return (
    <div className="container">
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        width={"100%"}
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={12}>
          <Paper
            sx={{
              p: 3,
              height: "auto",
              width: 300,
              marginTop: "3em",
              backgroundColor: (theme) =>
                theme.palette.mode === "dark" ? "#1A2027" : "#fff",
            }}
          >
            <Avatar
              sx={{
                marginLeft: "6em",
                bgcolor: red[500],
              }}
            ></Avatar>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box>
                <Typography textAlign={"center"} fontSize={"2em"}>
                  Registration Form
                </Typography>
                <Box marginY={2} />
                <TextField
                 type='text'
                  name="fullname"
                  {...register("fullname")}
                  fullWidth
                  variant="standard"
                  inputProps={{
                  maxLength:25,
                  minLength:7,
                  pattern:'[a-z]+[a-z]'
                  }}
                //   rules={{
                //     required: 'Enter fullname',
                //     pattern: {
                //       value:'/^[a-zA-Z]+ [a-zA-Z]+$/',
                //       message: 'Please enter a valid fullname'
                //     }
                //  }}    
                  label="Full Name:"
                  value={fullname}
                  onChange={(event) => {
                    setFullName(event.target.value)
                  }}
                
                />
            
                {errors.fullname && <p id="error">{errors.fullname.message}</p>}
                
                <Box marginY={2} />
                {/* <RedBar/> */}
                <TextField
                  {...register("username")}
                  fullWidth
                  variant="standard"
                  inputProps={{ maxLength: 30, minLength: 6 }}
                  label="User Name:"
                  type="text"
                  name="username"
                  value={username}
                  onChange={(event) => {
                    setUserName(event.target.value);
                  }}
                  rules={{
                    required: 'Enter Email',
                    pattern: {
                      value: /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: 'Please enter a valid Email'
                    }
                 }}
                />
                {errors.username && <p id="error">{errors.username.message}</p>}

                <Box marginY={2} />
                <TextField
                  {...register("password")}
                  fullWidth
                  variant="standard"
                  label="Password:"
                  inputProps={{ maxLength: 6, minLength: 6 }}
                  name="password"
                  type="password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                />
                {errors.password && <p id="error">{errors.password.message}</p>}
                <Box marginY={2} />
                <TextField
                  {...register("phone_number")}
                  fullWidth
                  variant="standard"
                  required
                  inputProps={{
                    maxLength:10,
                    minLength:10,
                    pattern:"[0-9]{10}"
                  }}
                  
                  label="Phone_Number:"
                  type="tel"
                  value={phone_number}
                  onChange={(event) => {
                    setPhone_Number(event.target.value.trim());
                  }}
                />
                {errors.phone_number && (
                  <p id="error">{errors.phone_number.message}</p>
                )}

                <Box marginY={2} />
                <Button
                  variant="contained"
                  style={{ display: "grid", placeItems: "center" }}
                  type="submit"
                >
                  {isSubmmiting ? (
                    <CircularProgress color="success" />
                  ) : (
                    "Register"
                  )}
                </Button>
                <Link marginX={26} underline="none" href="/">
                  Login
                </Link>
                {err ?

                  <Snackbar
                    open={open}
                    autoHideDuration={300}
                    onClose={closeSnackbar}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                  >
                    <Alert severity="success">
                      Hello {username},Successfully Register!
                    </Alert>
                  </Snackbar>
                :
                  <Snackbar
                    open={open}
                    onClose={closeSnackbar}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                    >
                    <Alert onClose={closeSnackbar} severity="error">
                      Oops! <strong>{username}</strong>Already Exist,try again
                      later.
                    </Alert>
                  </Snackbar>
                   
                }
              </Box>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
export default Registration;
