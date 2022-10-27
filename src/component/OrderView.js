import React, { useState, useEffect } from "react";
import Appbar from "../sharedComponent/Appbar";
import Container from "@mui/material/Container";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";

import FileCopyIcon from "@mui/icons-material/FileCopy";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import Edite from "@mui/icons-material/Edit";

import EditingCustomerOrder from "./EditingCustomerOrder";
import TakeOrderFromCustomer from "./TakeOrderFromCustomer";
import Payment from "./Payment";
import GivingTaskForDelivry from "./GivingTaskForDelivery";

 function OrderView() {
  const [image, setImage] = React.useState("");

  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [isopenModal, setisOpenModal] = useState(false);
  const [modalofEdit, setModalofEdit] = useState(false);
  const [show, setShow] = useState(false);

  const [einput, setEInput] = useState({
    name: "",
    amount: "",
  });

  const [input, setInput] = useState({
    order_id: "",
    delivery_boy: "",
  });

  function imageView(image) {
    axios.get("http://localhost:5000/api/image/" + image);
    setisOpenModal(true);
    setImage(image);
    console.log(image);
  }

  const deleteUser = React.useCallback(
    (_id) => () => {
      console.log(_id);
      setTimeout(() => {
        axios.get("http://localhost:5000/api/deleteOrder/" + _id);
      });
    },
    []
  );

  function EditOrder(_id) {
    setEInput({
      ...einput,
      _id: _id,
    });
    setModalofEdit(true);
  }
  function Take() {
    setShow(true);
  }

  const columns = React.useMemo(
    () => [
      { field: "id", headerName: "ID", width: 50 },
      { field: "fullname", headerName: "Full Name", width: 130 },
      { field: "address", headerName: "Address", width: 100 },
      {
        field: "amount",
        headerName: "Amount",
        type: "number",
        width: 80,
      },
      {
        field: "name",
        headerName: "Food Name",
        type: "String",
        width: 130,
      },
      {
        field: "status",
        headerName: "status",
        width: 100,
      },
      {
        field: "date",
        headerName: "Date",
        width: 190,
        // lastLogin: randomUpdatedDate(),
      },
      {
        field: "Payment",
        headerName: "Payment",
        type: "actions",
        width: 100,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<FileCopyIcon />}
            label="View Image"
            onClick={(ev) => {
              imageView(params.row.image);
            }}
            showInMenu
          />,
        ],
      },
      {
        field: "actions",
        type: "actions",
        headerName: "Action",
        width: 200,
        getActions: (params) => [
          <GridActionsCellItem
            icon={
              <DirectionsBikeIcon sx={{ color: "primary", fontSize: 40 }} />
            }
            label="Deliver"
            onClick={(ev) => {
              selectOrder(params.row._id);
            }}
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={deleteUser(params.row._id)}
          />,
          <GridActionsCellItem
            icon={<Edite />}
            label="Edite"
            onClick={(ev) => {
              EditOrder(params.row._id);
            }}
          />,
        ],
      },
    ]
    // [deleteUser]
  );

  useEffect(() => {
    const getData = () => {
      axios.get("http://localhost:5000/api/feachingOrder").then((response) => {
        setData(response.data);
      });
    };
    const fetch = () => {
      axios.get("http://localhost:5000/api/userCheck").then((res) => {
        setData1(res.data);
        // console.log(res.data)
      });
    };

    getData();
    fetch();
  }, []);
  

  if (!data) return "no data";

  let count = 0;
  let displays = data.map((order) => {
    count += 1;

    return { ...order, id: count };
  });

  const [openModal, setOpenModal] = useState(false);
  const [takeorderOpen, setTakeOrderOpen] = useState(false);

  const TakingOrderByOperater = () => {
    setTakeOrderOpen(true);
  };
  const handleChange = () => {
    setOpenModal(true);
  };

  const selectOrder = (order_id) => {
    setInput({
      ...input,
      order_id: order_id,
    });
    setOpenModal(true);
  };
  const handleClose = () => {
    setOpenModal(false);
    setisOpenModal(false);
    setModalofEdit(false);
    setShow(false);
    setTakeOrderOpen(false);
  };

  return (
    <div>
      <Appbar />

      <Container
        sx={{
          width: "100%",
          height: "600px",
          pt: 12,
        }}
      >
        <Button variant="outlined" onClick={Take}>
          Take Order From The Customer
        </Button>
        
        <TakeOrderFromCustomer
          show={show}
          setShow={setShow}
          takeorderOpen={takeorderOpen}
          setTakeOrderOpen={setTakeOrderOpen}
          TakingOrderByOperater={TakingOrderByOperater}
          handleClose={handleClose}
        />
        <Payment
          isopenModal={isopenModal}
          handleClose={handleClose}
          setisOpenModal={setisOpenModal}
          image={image}
          setImage={setImage}
        />

        <EditingCustomerOrder
          modalofEdit={modalofEdit}
          setEInput={setEInput}
          einput={einput}
          setModalofEdit={setModalofEdit}
          handleClose={handleClose}
        />

        <GivingTaskForDelivry
          openModal={openModal}
          handleClose={handleClose}
          input={input}
          setInput={setInput}
          data1={data1}
          setData1={setData1}
        />

      
        <Typography
          display={"grid"}
          fontFamily="inherit"
          fontSize="2em"
          placeItems="center"
        >
          Order Table
        </Typography>

        <DataGrid
          rows={displays}
          columns={columns}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
        />
      </Container>
    </div>
  );
}
export default OrderView;