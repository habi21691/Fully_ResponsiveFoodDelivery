import React, { useEffect, useState, useContext } from "react";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../Contexts/AuthContext";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Stack } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

 function Signin() {
  const { user, setUser, isLoggedIn, setLog, setCookie } = useContext(
    AuthContext
  );
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmmiting, setIsSumbiting] = useState(false);



  const [error, setError] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);




  

  const navigator = useNavigate();

  useEffect(() => {
    let checkOut = () => {
      if (isLoggedIn) {
        if (user.role === "User") {
          navigator("/");
        } else if (user.role === "admin") {
          navigator("/Admin_dashboard");
        } else if (user.role === "delivery_boy") {
          navigator("/Order_receving");
        }
      } else {
      }
    };

    checkOut();
  }, []);

  const closeSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSumbiting(true);
 
  
    setOpenSnackbar(true);
   


    const user = {
      username: username,
      password: password,
    };
    await axios
      .post("https://mernfood-delivery.onrender.com/api/Signin", user)
      .then((data) => {
        console.log(data.status);
        if (data.status === 200) {
        
          console.log(error);
          if (data.data.accessToken) {
            if (data.data.user.role === "User") {
              setUser(data.data.user);
              setCookie("token", data.data.accessToken, { path: "/" });

              // setMsg(data.data.user.message)
              setLog(true);
              navigator("/");
            } else if (data.data.user.role === "admin") {
              setUser(data.data.user);
              setCookie("token", data.data.accessToken, { path: "/" });
              setLog(true);
              // setMsg(data.data.user.message)
              navigator("/Admin_dashboard");
            } else if (data.data.user.role === "Delivery") {
              setUser(data.data.user);
              setCookie("token", data.data.accessToken, { path: "/" });
              setLog(true);
              navigator("/Task");
            } 
           
            }

          //---------------------------------
          // WANT TO CLOSE LOGIN DIALOG HERE;
          //---------------------------------
        } else if (data.status === 404) {
          setError(false)
          console.log("naughty naughty");
          // setMsg("User Error")
        
          //---------------------------------
          // WANT TO DISPLAY SNACKBAR HERE
          //---------------------------------
        } else if (data.status === 502) {
          console.log("off it's hinges, innit");
          
        } else {
       
          console.log("sumat went bang");
        }
      })
      .catch((err, data) => {
     
        setError(false)
      });

    setIsSumbiting(false);
    // setSuccess(false)
 
  };

  return (
    <div className="container">
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        // marginTop="5em"
        style={{
          minHeight: "100vh",
          // backgroundColor:'black'
        }}
      >
        <Grid item xs={8} >
          <Paper
            sx={{
              p: 2,
              height: 300,
              width: 300,
              marginTop:'5em',
              backgroundColor: (theme) =>
                theme.palette.mode === "dark" ? "#151e27" : "#fff",
            }}
          >
            <Avatar
              sx={{
                marginLeft: "6em",
                bgcolor: red[500],
              }}
            ></Avatar>

            <form onSubmit={handleSubmit}>
              <Box>
                <Typography textAlign={"center"} fontSize={"2em"}>
                  Sign In
                </Typography>
                <Box marginY={2} />
                <TextField
                  required
                  fullWidth
                  inputProps={{maxLength:30, minLength:6}}
                  variant="standard"
                  value={username}
                  label="User Name:"
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
                <Box marginY={2} />
                <TextField
                  required
                  fullWidth
                  inputProps={{maxLength:6, minLength:6}}

                  variant="standard"
                  label="Password:"
                  value={password}
                  type="password"
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                />
                <Box marginY={2} />
                <Button
                  variant="contained"
                  style={{ display: "grid", placeItems: "center" }}
                  type="submit"
                >
                  {isSubmmiting ? (
                    <CircularProgress size={"20px"} color={"success"}  />
                  ) : (
                    "Sign In"
                  )}
                </Button>
                <Link href="#">Forgot Password?</Link>
                <Link underline="none" href="https://habifooddelivery.netlify.app/Register" marginX={18}>
                  Register
                </Link>
              </Box>
              <Stack>
                {error ?(
                  <Snackbar
                    open={openSnackbar}
                    onClose={closeSnackbar}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                  >
                    <Alert onClose={closeSnackbar} severity="error">
                      Oops! Something went wrong,try again later.
                    </Alert>
                  </Snackbar>
                )
              : (
                <Snackbar
                  open={openSnackbar}
                  autoHideDuration={700}
                  onClose={closeSnackbar}
                  anchorOrigin={{ vertical: "top", horizontal: "center" }}
                >
                  <Alert severity="success">
                    Hi {username},Successfuly Logged !!!
                  </Alert>
                </Snackbar>
              ) }
              
              </Stack>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
export default Signin;