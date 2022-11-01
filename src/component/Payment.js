import React from 'react'
import { Dialog, DialogTitle, DialogContent,  } from '@mui/material'

function Payment(props) {
  return (
    <>
         <Dialog open={props.isopenModal} onClose={props.handleClose}>
          <DialogContent>
            <DialogTitle>Payment in Mobile Banking</DialogTitle>
            <img
              src={"https://mernfood-delivery.onrender.com/api/image/" + props.image}
              alt='im'
              height="300"
              width="300"
            />
          </DialogContent>
        </Dialog>
    </>
  )
}

export default Payment