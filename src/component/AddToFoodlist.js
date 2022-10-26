import React, { useState } from 'react'
import Appbar from '../sharedComponent/Appbar'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input'
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import { Card } from '@mui/material';

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
// }));



// const Input = styled('input')({
//   display: 'none',
// });

export default function AddToFoodlist() {



  const [catagories, setCatagories] = useState('')
  const [food, setFood] = React.useState('food')
  const [drink, setDrink] = useState("drink")
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [file, setFile] = useState(null)
  // const [filename, setFileName] = useState(null)

  const [isSubmmting, setIsSubmmiting] = useState(false)



  const handlePictureChange = (event) => {

    setFile(event.target.files[0]);
    // setFileName(event.target.files[0].name)

  }

  const handleChange = async (event) => {
    event.preventDefault()

    setIsSubmmiting(true);

    const data = new FormData();
    data.append('file', file)
    data.append('catagories', catagories)
    data.append('name', name)
    data.append('price', price)

    // console.log(file);
    // const data = {
    //   catagories: catagories,
    //   name: name,
    //   price: price,
    //   file: file,
    //   filename: filename
    // }

    const res = await axios.post('http://localhost:5000/api/imageUpload', data).then((data) => {

      console.log(data)


    })

  }




  return (
    <div>
      <Appbar />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container display='flex' justifyContent='center' sx={{pt:16}}>
          <Grid item xs={6} display='flex' justifyContent='center'  >
            {/* <
            sm={4} md={4}
              sx={{
                pl: 4,
                height:'380px',
                width: "70%",
                backgroundColor: (theme) =>
                  theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
              }}
            > */}
            <Paper
             sx={{
               width:'100%',
               p:1,
               height:'380px',
               backgroundColor: (theme) =>
               theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
              }}>
              <form onSubmit={handleChange} encType='multipart/form-data' method='post'>
                <>
                  <Typography textAlign='center' fontWeight={'800'} fontSize='2em' fontFamily={'inherit'}>Add Food</Typography>
                  
                  <FormControl fullWidth
                  >
                    <InputLabel value={catagories}>catagories</InputLabel>
                    <Select
                      labelId="demo-select-small"
                      id="demo-select-small"
                      value={catagories}
                      label="Catagories"
                      onChange={(event) => { console.log('category event', event.target.value); setCatagories(event.target.value) }}
                    >
                      <MenuItem value={food} onChange={(event) => { setFood(event.target.value) }}>Food</MenuItem>
                      <MenuItem value={drink} onChange={(event) => { setDrink(event.target.value) }}>Drink</MenuItem>
                    </Select>

                  </FormControl>
                  <Box marginY={2} />
                  <TextField fullWidth required label='name' value={name} onChange={(event) => { setName(event.target.value) }} />
                  <Box marginY={2} />
                  <TextField fullWidth required type={'number'} label='price'  value={price} onChange={(event) => { setPrice(event.target.value) }} />
                  <Box marginY={2} />
                  <Button variant='contained' component="label">
                    Upload 
                  <input
                    type='file'
                    accept='image/*'
                    name="image"
                    hidden={true}
                    onChange={handlePictureChange}
                  />

                  </Button>
                  {/* <Button variant="contained"
                    component="label">upload
                    <input
                      type="file"
                      accept="image/*"
                      name="image"
                    hidden
                  
                    />
                    </Button> */}
                  <IconButton color="primary" aria-label="upload picture" component="span">
                    <PhotoCamera />
                  </IconButton>

                  <Box marginY={2} />
                  <Stack direction='row' spacing={2} display='flex' justifyContent={'center'}>

                    <Button variant="outlined" type='rest' startIcon={<DeleteIcon />}>
                      Delete
                    </Button>
                    <Button variant="contained" type='submit' endIcon={<SendIcon />}>
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
  )
}
