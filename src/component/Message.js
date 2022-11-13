import React, {useState} from "react";
import Box from "@mui/material/Box";
import ReplyIcon from '@mui/icons-material/Reply';
import Button from '@mui/material/Button'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function Message() {

    const [replay, setReplay] = useState('')
      
    const handleSubmit = () => {
         const data = {
            replay:replay
         }
        console.log(data)
    }

  return (
    <div>
      <Box
        sx={{
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            minHeight:"100vh",
            backgroundColor: '#243438',
    boxShadow: '0 1px 0 0 rgba(170,170,170,0.01)'
        //   backgroundColor: "primary.dark",
        //   "&:hover": {
        //     backgroundColor: "primary.main",
        //     opacity: [0.9, 0.8, 0.7],
        //   },
        }}
      >
    <FormControl variant="standard" sx={{m:1, width:250 }}>
  <InputLabel id="demo-simple-select-label">Message replay</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={replay}
    onChange={(event) => {setReplay(event.target.value)}}
  >
    <MenuItem value={'Reached'}>I have it. Thanks</MenuItem>
    <MenuItem value={'No'}>I didn't have it!!</MenuItem>
    
  </Select>
</FormControl>
<Button onClick={handleSubmit}><ReplyIcon/></Button>
      </Box>
    </div>
  );
}

export default Message;
