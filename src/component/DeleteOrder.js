import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material'
import React from 'react'
import axios from 'axios';

function DeleteOrder(props) {
 
  function handleDelete (_id) {
    console.log(props.delete_id._id)
    axios.get("http://localhost:5000/api/deleteOrder/" + props.delete_id._id);
    props.handleClose()
  }

  return (
    <>
       <Dialog open={props.openDeletemodal} onClose={props.handleClose}>
      <DialogTitle>Are You Sure? You Want to Delete </DialogTitle>
      <DialogActions>
        <Button onClick={handleDelete} variant="outlined" color="error" >Delete</Button>
        <Button onClick={props.handleClose} variant="outlined" color="info">Cancel</Button>
      </DialogActions>
     </Dialog>
    </>
  )
}

export default DeleteOrder