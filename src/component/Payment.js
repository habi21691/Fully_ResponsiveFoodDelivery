import React from 'react'
import { Dialog, DialogTitle, DialogContent,  } from '@mui/material'

function Payment(props) {
  return (
    <>
         <Dialog open={props.isopenModal} onClose={props.handleClose}>
          <DialogContent>
            <DialogTitle>Payment in Mobile Banking</DialogTitle>
            <img
              src={"http://localhost:5000/api/image/" + props.image}
              height="300"
              width="300"
            />
          </DialogContent>
        </Dialog>
    </>
  )
}

export default Payment