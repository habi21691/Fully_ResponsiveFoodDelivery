import { Card, CardActions } from '@mui/material'
import { Container } from '@mui/system'
import axios from 'axios'
import React, { useEffect, useState,useContext, } from 'react'
import Appbar from '../../sharedComponent/Appbar'
import Grid from '@mui/material/Grid'
import CardContent from '@mui/material/CardContent'
import AuthContext from '../../Contexts/AuthContext';
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Location from './Location'


 function Task() {

  const {user} = useContext(AuthContext);
  const [data, setData] = useState('')



  useEffect(() => {
    const fetchingTask = () => {
      axios.get('http://localhost:5000/api/oderedTaskForDelivery/' +user.username).then((response) => {
        console.log(response.data)
        setData(response.data);
       
      })

    }
    fetchingTask()
  }, [])
  return (
    <div>
      <Appbar/>
      <Container display='flex' justifyContent='center' sx={{ pt: 16 }}>
        
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {data ? data.map((product, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <Card sx={{ maxWidth: 345 }}>
                <CardContent>
                <IconButton size='small' colo='red'  sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                            </IconButton>
                            
                                        
                <Typography gutterBottom variant="" component="div">
                   Order Name: {product.name}
                    </Typography>
                <Typography gutterBottom variant="" component="div">
                   Customer Name: {product.fullname}
                    </Typography>
                    <Typography gutterBottom variant="" component="div">
                    Phone No: {product.phonenumber}
                    </Typography>
                    <Typography gutterBottom variant="" component="div">
                     Address: {product.address}
                    </Typography>
                    <Typography gutterBottom variant="" component="div">
                     date: {product.date}
                    </Typography>
                    <CardActions>
                      <Button sx={{
                        // paddingLeft:3
                      }}>delivered</Button>
                    </CardActions>
                </CardContent>
              </Card>
            </Grid>
            )):<></>
}
        </Grid>
      
      </Container>
            {/* <Map /> */}
         <Location/>
   

      
    </div>
  )
}
export default Task;