import React, { useState } from "react";
import { Grid, TextField, Typography } from "@mui/material";
import Appbar from "../sharedComponent/Appbar";
import Box from "@mui/material/Box";
import image from "../asset/contact us.webp";
import Button from "@mui/material/Button";
import axios from "axios";
import PhoneIcon from "@mui/icons-material/Phone";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Link from "@mui/material/Link";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import GoogleIcon from "@mui/icons-material/Google";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import SendIcon from '@mui/icons-material/Send';
import ResetTvIcon from '@mui/icons-material/ResetTv';
import {Alert, Snackbar} from "@mui/material";

const Schema = yup.object().shape({
  name: yup.string().required("Name Require *"),
  email: yup
    .string()
    .email()
    .required("Email Require *"),
  message: yup.string().required("Message Require *"),
});

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function Contact() {
   
  const [open,setOpen] = useState(false)

  function handleClose ()  {
          setOpen(false)
  }

  function handleOpen () {
    setOpen(true)
  }

  const {
    register,
    handleSubmit,
    formState: { errors }
 
  } = useForm({
    resolver: yupResolver(Schema),
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessege] = useState("");

  // function handleSubmit () {

  // }

  const onSubmit = async (data1) => {
    // event.preventDefault();
 console.log(data1)
    const data = {
      name: name,
      email: email,
      message: message,
    };
    // console.log(data)
    const { status } = await axios.post(
      "https://mernfood-delivery.onrender.com/api/contact",
      data
    );
    if (status === 200) {
      handleOpen()
    }
  };

  return (
    <div>
      <Appbar />
      <Box sx={{ width: "100%" }}>
      <Snackbar
          open={open}
          onClose={
            handleClose
         }
          autoHideDuration={2000}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Message Sent!!
          </Alert>
        </Snackbar>
        <Grid container spacing={1}>
          <Grid item xs={12} md={6}>
            <img width={"100%"} pt={2} src={image} alt={image} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography
              variant="h4"
              sx={{ p: 2 }}
              align="center"
              component="h1"
              gutterBottom
            >
              {"Contact Us".toUpperCase()}
            </Typography>
            <Grid container direction="column">
              <Grid item>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  id="contact-form"
                  // onSubmit={this.handleSubmit}
                >
                  <Grid item>
                    <TextField
                      {...register("name")}
                      inputProps={{ maxLength: 23, minLength: 4 }}
                      id="name"
                      label="Name"
                      name="name"
                      margin="normal"
                      onChange={(event) => {
                        setName(event.target.value);
                      }}
                    />
                    {errors.name && <p id="error">{errors.name.message}</p>}
                  </Grid>
                  <Grid item>
                    <TextField
                      {...register("email")}
                      id="email"
                      label="Email"
                      name="email"
                      onChange={(event) => {
                        setEmail(event.target.value);
                      }}
                      margin="normal"
                    />
                    {errors.email && <p id="error">{errors.email.message}</p>}
                  </Grid>
                  <Grid item>
                    <TextField
                      fullWidth
                      {...register("message")}
                      id="message"
                      label="Message"
                      inputProps={{minLength:2, maxLength:200}}
                      name="message"
                      onChange={(event) => {
                        setMessege(event.target.value);
                      }}
                      margin="normal"
                      multiline
                    />
                    {errors.message && (
                      <p id="error">{errors.message.message}</p>
                    )}
                  </Grid>
                  <Grid
                    container
                    direction="row"
                    spacing={2}
                    style={{ marginTop: 20 }}
                  >
                    <Grid item>
                      <Button type="reset" variant="contained">
                       <ResetTvIcon sx={{fontSize:30}}/> 
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        type="submit"
                        variant="contained"
                        onClick={handleSubmit(onSubmit)}
                        // color="primary"
                      >
                        <SendIcon sx={{fontSize:30}}/>
                     
                      </Button>
                    </Grid> 
                  </Grid>
                </form>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Box marginY={4} />
        <Grid
          container
          spacing={3}
          justifyContent="center"
          sx={{ background: "#000000", p: 2, color: "black" }}
        >
          <Grid direction="column" item>
            <Item>
              <Typography>Main Office</Typography>
              <p>Our main office is located in Dessie , Around Menafesha </p>
              <p>
                <LocationOnIcon /> Alma Building{" "}
              </p>
              <p>
                <Link>
                  <PhoneIcon fontSize="small" /> +251 947312436
                </Link>
              </p>
              <p>
                <Link>
                  <SmartphoneIcon />
                  +251 900443539
                </Link>
              </p>
              <p>
                <Link>
                  <LocalPostOfficeIcon fontSize="small" />
                  55671
                </Link>
              </p>
            </Item>
          </Grid>
          <Grid item direction="column" sx={{}}>
            <Item>
              <FacebookIcon fontSize="large" />
              <>
                <TwitterIcon fontSize="large" />
              </>
              <>
                <GoogleIcon fontSize="large" />
              </>
              <>
                <YouTubeIcon fontSize="large" />
              </>
            </Item>
          </Grid>
          <Grid item direction="column">
            <Item>Wolllo Dessie,Ethiopia</Item>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
export default Contact;
