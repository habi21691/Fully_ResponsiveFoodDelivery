import Grid from '@mui/material/Grid'
import React, { useContext } from 'react'
import Appbar from '../../sharedComponent/Appbar'
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import AuthContext from '../../Contexts/AuthContext';
import image from '../../asset/she.webp'
import image2 from '../../asset/adminPic.webp'

export default function Admin_dashboard() {
  const { user, setUser, isLoggedIn, setLog } = useContext(AuthContext);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  return (
    <div>
      <Appbar />

      {user.role}

      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{pt:2,pl:1}}>
        <Grid item xs={12} md={6}>
          <img
            style={{
              width: '100%',
              height: 'auto'
            }}
            src={image}


          />
        </Grid>
        <Grid item xs={12} md={4}>
          <img
            style={{
              width:'100%',
              height:'auto'
            }}
            src={image2}
          />
        </Grid>
        {/* {Array.from(Array(6)).map((_, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <Item>xs=2</Item>
          </Grid>
        ))} */}
      </Grid>

    </div>
  )
}
