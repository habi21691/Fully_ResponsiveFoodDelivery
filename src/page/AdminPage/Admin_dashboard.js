import Grid from "@mui/material/Grid";
import React, { useContext, useState, useEffect } from "react";
import Appbar from "../../sharedComponent/Appbar";
import {
  experimentalStyled as styled,
  createTheme,
  ThemeProvider,
} from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import AuthContext from "../../Contexts/AuthContext";
import image from "../../asset/she.webp";
import image2 from "../../asset/adminPic.webp";
import Chart from "../../component/Chart";
import { Button, Container } from "@mui/material";
import { mainListItems, secondaryListItems } from "../AdminPage/listItem"; // import Orders from '../../component/OrderView'
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import { Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CssBaseline from "@mui/material/CssBaseline";
import Orders from "../../component/OrderView";
import Deposits from "./Deposite";
import Link from "@mui/material/Link";
import axios from "axios";
import AssignDriver from "./AssignDriver";
import { DataGrid } from "@mui/x-data-grid";
import MenuItem from "@mui/material//MenuItem";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Modal from "@mui/material/Modal";
import MailIcon from '@mui/icons-material/Mail'


function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://habifooddelivery.netlify.app">
        My WebSite
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
function Admin_dashboard() {
  const [openDriver, setOpenDriver] = useState(true);
  const [getRows, setRows] = useState([]);
  const [loadData, setData2] = useState([]);

  const [message, setMessage] = useState(false);

  function handleMessage () {
    setMessage(true)
  }

  useEffect(() => {
    const getnotification = async () => {
      await axios
        .get("https://mernfood-delivery.onrender.com/api/getfeadback")
        .then((res) => {
          console.log(res.data);
          setData2(res.data);
          setRows(res.data.length);
        });
    };
    getnotification();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "fullname",
      headerName: "Full Name",
      width: 150,
      editable: true,
    },
    {
      field: "username",
      headerName: "UserName",
      width: 150,
      editable: true,
    },
    {
      field: "phone_number",
      headerName: "Phone Number",
      width: 150,
      editable: true,
    },
  ];

  const handleClose = () => {
    setOpen(false);
    setMessage(false)

  };
  const [open, setOpen] = useState(false);

  function handleOpen() {
    setOpen(true);
  }

  const mdTheme = createTheme();

  const [data, setData] = useState([]);

  useEffect(() => {
    const getdata = async () => {
      await axios
        .post("https://mernfood-delivery.onrender.com/api/feachingDriver")
        .then((res) => {
          setData(res.data);
        });
    };
    getdata();
  }, []);
  if (!data) return "no data";

  let count = 0;
  let displays = data.map((order) => {
    count += 1;

    return { ...order, id: count };
  });

  return (
    <div>
      <Appbar />

      <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />

          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: "100vh",
              overflow: "auto",
            }}
          >
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Grid container spacing={3}>
                {/* Chart */}
                <Grid item xs={12} md={8} lg={9}>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      height: 240,
                    }}
                  >
                    <Chart />
                  </Paper>
                </Grid>
                {/* Recent Deposits */}
                <Grid item xs={12} md={4} lg={3}>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      height: 240,
                    }}
                  >
                    <Deposits />
                  </Paper>
                  <Box>
                    <Modal
                      open={message}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                        <Grid container spacing={2}>
                          <Grid>
                            <TableContainer component={Paper}>
                              <Table
                                sx={{ minWidth: 300 }}
                                size="small"
                                aria-label="a dense table"
                              >
                                <TableHead>
                                  <TableRow>
                                    <TableCell component="th">
                                      <b> Name</b>
                                    </TableCell>
                                    <TableCell component="th">
                                      <b>Email</b>
                                    </TableCell>
                                    <TableCell component="th">
                                      <b>message</b>
                                    </TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {loadData.map((row, index) => (
                                    <TableRow
                                      style={{
                                        backgroundColor:
                                          row.status == "0"
                                            ? "#ccffcc"
                                            : "white",
                                      }}
                                      key={index}
                                    >
                                      <TableCell> {row.name} </TableCell>
                                      <TableCell>{row.email}</TableCell>
                                      <TableCell>{row.message}</TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </Grid>
                        </Grid>
                        <br />
                        <br />
                        <Box textAlign="center">
                          {" "}
                          <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            onClick={handleClose}
                            // onClick={updateNotification}
                          >
                            Ok
                          </Button>
                        </Box>
                      </Box>
                    </Modal>

                    <MenuItem
                     onClick={handleMessage}
                    >
                       <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      height: 240,
                    }}
                    >
                    Message from the Customer

                      <IconButton
                        size="large"
                        aria-label="show 17 new notifications"
                        color="inherit"
                        >
                        <Badge
                          // badgeContent={5}
                          // badgeConent={getRows == '0' ? '0' : getRows}
                          badgeContent={getRows == "0" ? "0" : getRows}
                          color="error"
                          >
                          <MailIcon />
                        </Badge>
                      </IconButton>
                          </Paper>
                    </MenuItem>
                  </Box>
                </Grid>
                <Button onClick={handleOpen} variant="contained" sx={{ m: 5 }}>
                  Add Driver
                </Button>
                <AssignDriver
                  open={open}
                  setOpen={setOpen}
                  openDriver={openDriver}
                  setOpenDriver={setOpenDriver}
                  handleClose={handleClose}
                />

                <Grid item xs={12}>
                  <Box sx={{ height: 400, width: "100%" }}>
                    Driver
                    <DataGrid
                      rows={displays}
                      columns={columns}
                      pageSize={9}
                      rowsPerPageOptions={[9]}
                      checkboxSelection
                    />
                  </Box>
                </Grid>
              </Grid>
              <Copyright sx={{ pt: 14 }} />
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    </div>
  );
}
export default Admin_dashboard;
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
