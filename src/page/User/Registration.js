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
  username: yup.string().required("Username Require * "),
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

  const [err, setErr] = useState(false);
  // const handleSnackOpen = () => {
  //   setErr(true);
  // };

  const closeSnackbar = () => {
    setOpen(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data1) => {
    console.log(data1);
    setIsSubmmiting(true);
    setOpen(true);
    // setErr(true)

    const data = {
      fullname: fullname,
      username: username,
      password: password,
      phone_number: phone_number,
    };
    // console.log(data.username)
    // console.log(username)
    if ( phone_number.length < 10 || phone_number >10 ) {
      console.log("phone_number must be 10");
    }
   
    

    await axios
      .post("https://mernfood-delivery.onrender.com/api/Register", data)
      .then((data) => {
        console.log(data.status);
       
        if (data.status === 200) {
          console.log(err);
          setErr(true);
          console.log(err)
        } else {
          console.log(err);
        }
      });
    setIsSubmmiting(false);
    setErr(false);
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
                   
                  }}
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
                  inputProps={{ maxLength: 14, minLength: 6 }}
                  label="User Name:"
                  type="text"
                  name="username"
                  value={username}
                  onChange={(event) => {
                    setUserName(event.target.value);
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
                    pattern:"[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  }}
                  
                  label="Phone_Number:"
                  type="tel"
                  value={phone_number}
                  onChange={(event) => {
                    setPhone_Number(event.target.value);
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
                {err &&<Stack>

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
                
                  {/* <Snackbar
                    open={open}
                    onClose={closeSnackbar}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                    >
                    <Alert onClose={closeSnackbar} severity="error">
                      Oops! <strong>{username}</strong>Already Exist,try again
                      later.
                    </Alert>
                  </Snackbar> */}
                    </Stack>
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
