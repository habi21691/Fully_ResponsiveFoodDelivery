import React from 'react'
import axios from 'axios';
import { Dialog, DialogContent, DialogActions } from '@mui/material';
import {Button, Typography,Select,FormControl,InputLabel,MenuItem} from '@mui/material';
import { pink } from '@mui/material/colors';
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import {Snackbar, Alert} from '@mui/material';


function GivingTaskForDelivry(props) {
    const taskgiving = async () => {
        const data = {
          order_id: props.input.order_id,
          delivery_boy: props.input.delivery_boy,
        };
        await axios
          .post("https://mernfood-delivery.onrender.com/api/givingTask", data)
          .then((res) => {
            console.log(res.status);
           if(res.status === 200){
            props.setTakeOrderOpen(true)
           }
            // handleClose();
          })
          .catch((err) => {
            console.log(err);
          });
      };
  return (
    <>
<Dialog open={props.openModal} onClose={props.handleClose}>
<Snackbar
          open={props.takeorderOpen}
          onClose={() => {
            props.handleClose();
        
          }}
          autoHideDuration={2000}
        >
          <Alert
            onClose={props.handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Successfully Asign TO the Delivery Boy!!
          </Alert>
        </Snackbar>
          <DialogContent>
            <Typography>
              {" "}
              <strong>Deliver Boy</strong>{" "}
              <DirectionsBikeIcon sx={{ color: pink[500], fontSize: 25 }} />
            </Typography>
            <FormControl sx={{ m: 1, minWidth: 120, p: 2 }} size="small">
              <InputLabel id="demo-select-small">Choose</InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={props.input.delivery_boy}
                onChange={(event) => {
                  console.log(event.target.value);
                  props.setInput({ ...props.input, delivery_boy: event.target.value });
                }}
                displayEmpty={true}
                autoWidth
                label="Choose"
              >
                {props.data1.map((data) => {
                  return (
                    <MenuItem key={data.username} value={data.username}>
                      {data.username}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <DialogActions>
              <DialogActions>
                <Button onClick={props.handleClose} variant="outlined" color="error">
                  Cancel
                </Button>
                <Button
                  onClick={taskgiving}
                  style={{ display: "grid", placeItems: "center" }}
                  variant="contained"
                  color="success"
                >
                  Submit
                </Button>
              </DialogActions>
            </DialogActions>
          </DialogContent>
        </Dialog>
    </>
  )
}

export default GivingTaskForDelivry