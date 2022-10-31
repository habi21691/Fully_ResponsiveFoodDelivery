import React, { useState } from "react";
import Appbar from "../sharedComponent/Appbar";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack";
import axios from "axios";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {Snackbar, Alert} from "@mui/material";

const Schema = yup.object().shape({
  catagories: yup.string().required(" Catagories Requier "),
  name: yup.string().required("Food Name Require *"),
  price: yup.number().integer().positive().required("price Require *"),
  file: yup
    .mixed()
    .test("required", "You need to provide a file", (value) => {
      return value && value.length;
    })
    .test("fileSize", "The file is too large", (value, context) => {
      return value && value[0] && value[0].size <= 20000000;
    }),
});

function AddToFoodlist() {
  const [catagories, setCatagories] = useState("");
  const [food, setFood] = React.useState("food");
  const [drink, setDrink] = useState("drink");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState(null);

  const [isSubmmting, setIsSubmmiting] = useState(false);
  const [open, setOpen] = useState(false)


   const handleClose = () => {
    setOpen(false)
   }
  const handlePictureChange = (event) => {
    setFile(event.target.files[0]);
  };

  const {
    register,
    handleSubmit,
    formState:{ errors },
    
  } = useForm({
    resolver: yupResolver(Schema)
  })

  const onSubmit = async (data2) => {
    // event.preventDefault();

    setIsSubmmiting(true);

    const data = new FormData();
    data.append("file", file);
    data.append("catagories", catagories);
    data.append("name", name);
    data.append("price", price);

     await axios
      .post("http://localhost:5000/api/imageUpload", data)
      .then((data) => {
        console.log(data);
        if( data.status === 200){
          setOpen(true)
        }
      });
  };

  return (
    <div>
      <Appbar />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container display="flex" justifyContent="center" sx={{ pt: 16 }}>
          <Grid item xs={6} display="flex" justifyContent="center">
            <Paper
              sx={{
                width: "100%",
                p: 1,
                height: "380px",
                backgroundColor: (theme) =>
                  theme.palette.mode === "dark" ? "#1A2027" : "#fff",
              }}
            >
              <form
                onSubmit={handleSubmit(onSubmit)}
                encType="multipart/form-data"
                method="post"
              >
                  <Snackbar
          open={open}
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
        </Snackbar>
                <>
                  <Typography
                    textAlign="center"
                    fontWeight={"800"}
                    fontSize="2em"
                    fontFamily={"inherit"}
                  >
                    Add Food
                  </Typography>

                  <FormControl fullWidth>
                    <InputLabel value={catagories}>catagories</InputLabel>
                    <Select
                      labelId="demo-select-small"
                      {...register('catagories')}
                      id="demo-select-small"
                      value={catagories}
                      label="Catagories"
                      onChange={(event) => {
                        console.log("category event", event.target.value);
                        setCatagories(event.target.value);
                      }}
                    >
                      <MenuItem
                        value={food}
                        onChange={(event) => {
                          setFood(event.target.value);
                        }}
                      >
                        Food
                      </MenuItem>
                      <MenuItem
                        value={drink}
                        onChange={(event) => {
                          setDrink(event.target.value);
                        }}
                      >
                        Drink
                      </MenuItem>
                    </Select>
                  </FormControl>
                  <Box marginY={2} />
                  <TextField
                    fullWidth
                 {...register('name')}
                 inputProps={{maxLength:10, minLength:2}}
                    label="name"
                    value={name}
                    onChange={(event) => {
                      setName(event.target.value);
                    }}
                  />
                  {errors.name && <p id='error'>{errors.name.message}</p>}
                  <Box marginY={2} />
                  <TextField
                    fullWidth
                    {...register('price')}
                    type={"number"}
                    label="price"
                    value={price}
                    onChange={(event) => {
                      setPrice(event.target.value);
                    }}
                  />
                  {errors.price && <p id='error'>{errors.price.message}</p>}
                  <Box marginY={2} />
                  <Button variant="contained" component="label">
                    Upload
                    </Button>

                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    >
                    <PhotoCamera />
                  </IconButton>
                    <input
                      type="file"
                     {...register('file')}
                      // accept="image/*"
                      // name="image"
                      // hidden={true}
                      onChange={handlePictureChange}
                    />
                    {errors.file && <p  id='error'>{errors.file.message}</p>}

                  <Box marginY={2} />
                  <Stack
                    direction="row"
                    spacing={2}
                    display="flex"
                    justifyContent={"center"}
                  >
                    <Button
                      type="reset"
                      variant="outlined"
                      startIcon={<DeleteIcon />}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="contained"
                      type="submit"
                      endIcon={<SendIcon />}
                    >
                      Send
                    </Button>
                  </Stack>
                </>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
export default AddToFoodlist;
