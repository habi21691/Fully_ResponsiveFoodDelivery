import React, { useState, useEffect, useContext } from "react";
import Appbar from "../sharedComponent/Appbar";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CircularProgress, Snackbar } from "@mui/material";
import { Button } from "@mui/material";
import AuthContext from "../Contexts/AuthContext";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert from "@mui/material/Alert";
import Rate from "@mui/material/Rating";
// import 'react-slideshow-image/dist/styles.css'
import SimpleImageSlider from "react-simple-image-slider";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={2} ref={ref} variant="filled" {...props} />;
});

const images = [
  {
    url:
      "https://images.unsplash.com/photo-1589010588553-46e8e7c21788?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1560&q=80",
  },
  {
    desc:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus, doloremque.",
  },
  {
    url:
      "https://images.unsplash.com/photo-1615719413546-198b25453f85?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=436&q=80",
    desc:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus, doloremque.",
  },
  {
    url:
      "https://images.unsplash.com/photo-1576866209830-589e1bfbaa4d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    desc:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus, doloremque.",
  },
  {
    desc:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus, doloremque.",
    url:
      "https://images.unsplash.com/photo-1615887087343-6a32f45f27a4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
  },
  {
    desc:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus, doloremque.",
    url:
      "https://images.unsplash.com/photo-1621241441637-ea2d3f59db32?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  },
];

const schema = yup.object().shape({
  fullname: yup.string().required("Fullname is Required"),
  address: yup.string().required("Adress is Required"),
  phonenumber: yup
    .number()
    .positive()
    .integer()

    .required("phoneNumber is Required"),
  amount: yup
    .number()
    .positive()
    .integer()
    .required("amount is required"),
  // file: yup.array()
  //      .nullable()
  //      .required(' File_FIELD_REQUIRED')
  file: yup
    .mixed()
    .test("required", "You need to provide a file", (value) => {
      return value && value.length;
    })
    .test("fileSize", "The file is too large", (value, context) => {
      return value && value[0] && value[0].size <= 20000000;
    })
    ,

  // file: yup.file().required("file is required"),
});

export default function Menu() {
  // const submitForm = (data) => {
  //   console.log(data);
  // };
  const { user, setUser, isLoggedIn, setLog, setCookie } = useContext(
    AuthContext
  );

  const [fullname, setFullname] = useState("");
  const [address, setAddress] = useState("");
  const [phonenumber, setPhoneNuber] = useState("");
  const [amount, setAmount] = useState(1);
  const [price, setPrice] = useState(1);
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  // const [price , setPrice]  = useState()
  const [isSubmiting, setIsSubmiting] = useState(false);

  const [isopenModal, setisOpenModal] = useState(false);

  const openModal = (name, price) => {
    setisOpenModal(true);
    setName(name);
    setPrice(price);
  };
  const closemodal = () => {
    setisOpenModal(false);
    setFullname("");
    setAddress("");
    setPhoneNuber("");
    setAmount(1);
    setFile("");
    setName("");
    // setIsSubmiting(false)
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handlePictureChange = (event) => {
    setFile(event.target.files[0]);

    // setFileName(event.target.files[0].name)
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data1) => {
    console.log(data1);
    // event.preventDefault();
    setIsSubmiting(true);
    setOpen(false);

    const data = new FormData();
    data.append("file", file);
    data.append("address", address);
    data.append("amount", amount);
    data.append("phonenumber", phonenumber);
    data.append("fullname", fullname);
    data.append("name", name);

    const { status } = await axios.post(
      "http://localhost:5000/api/Ordering",
      data
    );

    console.log(data);
    if (status === 200) {
      handleOpen();
    }

    setIsSubmiting(false);
  };

  const [data, setData] = useState([]);
  useEffect(() => {
    // console.log(user)
    let getData = () => {
      axios
        .get("http://localhost:5000/api/uploadedProduct")
        .then((response) => {
          // console.log(response)
          setData(response.data.product);
        });
    };
    getData();
    // console.log(data)
  }, []);
  // console.log(data)
  return (
    <div>
      <Appbar />
      {/* <img
        src={imagee}
        width='100%'
        height='auto'
      /> */}
      <SimpleImageSlider
        width={"100%"}
        autoPlay={true}
        height={504}
        images={images}
        showBullets={true}
        showNavs={true}
      />

      <Typography display="grid" justifyItems="center" fontSize="2em">
        Menu
      </Typography>

      <Dialog open={isopenModal} onClose={closemodal}>
        <Snackbar
          open={open}
          onClose={() => {
            handleClose();
            closemodal();
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
        </Snackbar>
        <IconButton
          edge="start"
          color="inherit"
          onClick={closemodal}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>

        <DialogTitle>Order Form</DialogTitle>
        <form id="form-submit" onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              {...register("fullname")}
              value={fullname}
              inputProps={{ maxLength: 30, minLength: 7 }}
              type="text"
              label="Fullname"
              onChange={(event) => {
                setFullname(event.target.value);
              }}
              fullWidth
              variant="standard"
            />
            {errors.fullname && <p id="error">{errors.fullname.message}</p>}{" "}
            <TextField
              autoFocus
              type="text"
              margin="dense"
              {...register("address")}
              value={address}
              inputProps={{ maxLength: 15, minLength: 4 }}
              label="address"
              onChange={(event) => {
                setAddress(event.target.value);
              }}
              fullWidth
              variant="standard"
            />
            {errors.address && <p id="error">{errors.address.message}</p>}{" "}
            <TextField
              autoFocus
              margin="dense"
              {...register("phonenumber")}
              value={phonenumber}
              inputProps={{ maxLength: 10, minLength: 10 }}
              onChange={(event) => {
                setPhoneNuber(event.target.value);
              }}
              label="PhoneNumber"
              fullWidth
              variant="standard"
            />
            {errors.phonenumber && (
              <p id="error">{errors.phonenumber.message}</p>
            )}{" "}
            <TextField
              autoFocus
              required
              margin="dense"
              {...register("name")}
              value={name}
              label="Name"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              required
              margin="dense"
              {...register("amount")}
              value={amount}
              onChange={(event) => {
                setAmount(event.target.value);
              }}
              label="Amount"
              type="number"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              required
              margin="dense"
              value={amount * price}
              label="Price"
              type="number"
              fullWidth
              variant="standard"
            />
            < >
              Upload Payment ScreenShot
              <input
                {...register("file")}
                type="file"
                // accept="image/*"
                // name="image"
             
                // hidden={true}
                onChange={handlePictureChange}
              />
            </>
            {errors.file && <p id="error">{errors.file.message}</p>}
          </DialogContent>
          <DialogActions>
            <Button onClick={closemodal} variant="outlined" color="error">
              Cancel
            </Button>
            <Button
              type="submit"
              // onClick={handleSubmit(submitForm)}
              disabled={isSubmiting}
              style={{ display: "grid", placeItems: "center" }}
              variant="contained"
              color="success"
            >
              Submit
              {/* {isSubmiting ? <CircularProgress size={"20px"} /> : "Submit"} */}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          paddingLeft="20px"
        >
          {data ? (
            data.map((product, index) => (
              <Grid item xs={2} sm={4} md={4} key={index}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image={"http://localhost:5000/api/image/" + product.image}
                      alt="green iguana"
                    />

                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {product.name}
                      </Typography>
                      <Typography gutterBottom variant="h5" component="div">
                        ዋጋ: {product.price} ብር
                      </Typography>
                      <Typography></Typography>
                      <Rate />
                    </CardContent>
                  </CardActionArea>
                  <Stack display="grid" justifyContent={"center"}>
                    <Button
                      fontSize="2em"
                      variant="contained"
                      onClick={(ev) => {
                        openModal(product.name, product.price);
                      }}
                      color="info"
                    >
                      Order
                    </Button>
                  </Stack>
                  <Box marginY={2} />
                </Card>
              </Grid>
            ))
          ) : (
            <></>
          )}
        </Grid>
        <Stack>
          <></>
        </Stack>
      </Box>
    </div>
  );
}
