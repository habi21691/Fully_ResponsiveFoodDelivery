import React, { Fragment, useEffect, useState, useContext } from "react";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import Image from "../asset/deliver.png";
import Box from "@mui/material/Box";
import { styled, alpha } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Appbar from "../sharedComponent/Appbar";
import axios from "axios";
import Image2 from "../asset/11241416_4676729.jpg";
import FoodImage from "../asset/food2.png";
import { Typography } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import Typewriter from "typewriter-effect";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import RightArrowIcon from "../asset/icons/right-arrow.png";
import LeftArrowIcon from "../asset/icons/left-arrow.png";
import ImageGift from "../asset/hamburger-64_256.gif";
import PaymentIcon from "@mui/icons-material/Payment";
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  marginTop: "14em",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: "4em",
  width: "50%",
  [theme.breakpoints.up("sm")]: {
    marginTop: "4em",
    // marginLeft: theme.spacing(30),
    width: "auto",
  },
}));

// const SearchIconWrapper = styled("div")(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: "100%",
//   position: "absolute",
//   pointerEvents: "none",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
// }));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "30ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));


const ImageData = [
  {
    id: 1,
    title: "በየ አይነት",
    img: "https://upload.wikimedia.org/wikipedia/commons/0/03/Alicha_1.jpg",
  },
  {
    id: 2,
    title: "ክትፎ",
    img:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Kitfo.jpg/800px-Kitfo.jpg",
  },

  {
    id: 3,
    title: "ጭችብሳ",
    img:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Kitcha_fit_fit.png/800px-Kitcha_fit_fit.png",
  },
  {
    id: 4,
    title: "ስፒሳል",
    img:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Ethiopian_cuisine_fusion.jpg/800px-Ethiopian_cuisine_fusion.jpg",
  },
  {
    id: 5,
    title: "ፒዛ",
    img:
      "https://hips.hearstapps.com/hmg-prod/images/delish-homemade-pizza-horizontal-1542312378.png?crop=1.00xw:1.00xh;0,0&resize=1200:*",
  },

  {
    id: 6,
    title: "ፒዛ",
    img:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
  },
  {
    id: 6,
    title: "ፒዛ",
    img:
      "https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTV8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
];

function Searchbar() {
  
  const LeftArrow = () => {
    const { scrollPrev } = useContext(VisibilityContext);

    return (
      <Typography onClick={() => scrollPrev()} className="right-arrow">
        <img src={LeftArrowIcon} alt="right-arrow" />
      </Typography>
    );
  };

  const RightArrow = () => {
    const { scrollNext } = useContext(VisibilityContext);
    return (
      <Typography onClick={() => scrollNext()} className="left-arrow">
        <img src={RightArrowIcon} alt="right-arrow" />
      </Typography>
    );
  };

  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    let getData = () => {
      axios.get("http://localhost:5000/api/featchinForSearch").then((data) => {
        setData(data.data);
        console.log(data.data);
      });
    };
    getData();
  }, []);

  return (
    <Fragment>
      <>
        <Appbar />
        <div
          style={{
            backgroundImage: `linear-gradient( rgba(8, 8, 37, 0.85), rgba(0, 15, 80, 0.675)), url("${FoodImage}")`,
            backgroundSize: "cover",
            height: "70vh",
            color: "#f5f5f5",
            marginTop: "3em",
            textAlign: "center",
          }}
        >
          <div className="typewriting">
            <Typewriter
              options={{
                autoStart: true,
                loop: true,
              }}
              onInit={(typewriter) => {
                typewriter
                  .typeString("Fast Food Delivery Service")
                  .pauseFor(5000)
                  .deleteAll()
                  .typeString("Get in Touch With Us !! ")
                  .start();
              }}
            />
          </div>
          <div className="typewriting2">
            <Typewriter
              options={{
                autoStart: true,
                loop: false,
              }}
              onInit={(typewriter) => {
                typewriter
                  .typeString("Online Payment Option!")
                  .pauseFor(2000)
                  .deleteAll()
                  .typeString("Easy use Plateform!!")
                  .start();
              }}
            />
          </div>
       
          <Typography mt={8}>
            <Typography variant="h4">
              <PhoneIcon sx={{ color: "primary", fontSize: 40 }} />
              4523
            </Typography>
            <img src={ImageGift} />
          </Typography>
        </div>

        <Box sx={{ flexGrow: 1 }}>
          <Grid>
            <Appbar />
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6}>
              <Search>
                {/* <SearchIconWrapper>
                                
                                </SearchIconWrapper> */}
                <SearchIcon />
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                  onChange={(event) => {
                    setSearch(event.target.value);
                  }}
                />

                {data
                  .filter((value) => {
                    if (search === "") {
                      return value;
                    } else if (
                      value.name.toLowerCase().includes(search.toLowerCase())
                    ) {
                      return value;
                    }
                  })
                  .map((value, key) => {
                    return (
                      <div key={key}>
                        <p>{value.name}</p>
                      </div>
                    );
                  })}
              </Search>

             
            </Grid>
            <Grid item xs={12} md={6}>
              <img
                style={{
                  width: "100%",
                  height: "auto",
                }}
                alt="Remy Sharp"
                src={Image}
              />
            </Grid>
          </Grid>
        </Box>
        <Typography style={{ color: "#ee8471", fontSize: "30px" }}>
          Spacial Offer
        </Typography>
        <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow} className="">
          {ImageData.map((item) => (
            <Box
              key={item.id || item}
              itemId={item.id || item}
              title={item.title || item}
              m="0 20px"
              onClick={() => {
                //  setBodyPart(item)
                window.scrollTo({
                  top: 1800,
                  behaviour: "smooth",
                  duration: 20,
                });
              }}
            >
              <img src={item.img} className="img" height={200} width={220} />
            </Box>
          
          ))}
        </ScrollMenu>

        <Box mt={12}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6}>
              <img
                src={Image2}
                style={{
                  width: "70%",
                  height: "auto",
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h3">
                Easy Steps to Use The Service
              </Typography>
              <Typography variant="h4" mt={7}>
                <FormatListBulletedIcon
                  style={{
                    color: "white",
                    background: "#f06666",
                    fontSize: 40,
                  }}
                />{" "}
                Get in to The website
              </Typography>
              <Typography variant="h4" mt={7}>
                <HowToRegOutlinedIcon
                  style={{
                    color: "white",
                    background: "#f06666",
                    fontSize: 40,
                  }}
                />{" "}
                Sign or Register to be customer
              </Typography>
              <Typography variant="h4" mt={7}>
                <LocationOnOutlinedIcon
                  style={{
                    color: "white",
                    background: "#f06666",
                    fontSize: 40,
                  }}
                />{" "}
                Your Spacific Location
              </Typography>

              <Typography variant="h4" mt={7}>
                <PaidOutlinedIcon
                  style={{
                    color: "white",
                    background: "#f06666",
                    fontSize: 40,
                  }}
                />{" "}
                Pay For Your Service
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Box mt={12}>
          <Grid container spacing={2} >
            <Grid item xs={12} md={6} mt={6}>
              <Grid container justifyContent="center" alignItems="center">
                <PaymentIcon sx={{ fontSize: 70, color:'green',borderRadius:'1px solid #099FFF' }} />
                <Typography  variant="h4"
              sx={{ p: 2 }}
              align="center"
              // component="h1"
              gutterBottom>Easy Payment</Typography>
              </Grid>
            </Grid>
            <Grid item xs={12} md={6} mt={6}>
              <Grid container justifyContent="center" alignItems="center">
                <DirectionsBikeIcon sx={{ fontSize: 70, color:'green' }} />
                <Typography  variant="h4"
              sx={{ p: 2 }}
              align="center"
              // component="h1"
              gutterBottom>  Fast Drive </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12} md={6} mt={6} >
              <Grid container justifyContent="center" alignItems="center">
                <SupportAgentIcon sx={{ fontSize: 70, color:'green' }} />
                <Typography  variant="h4"
              sx={{ p: 2 }}
              align="center"
              // component="h1"
              gutterBottom> Fast Support</Typography>
              </Grid>{" "}
            </Grid>
            <Grid item xs={12} md={6} mt={6}>
              <Grid container justifyContent="center" alignItems="center">
                <WorkspacePremiumIcon sx={{ fontSize: 70, color:'green' }} />
                <Typography  variant="h4"
              sx={{ p: 2 }}
              align="center"
              // component="h1"
              gutterBottom>Fully Guranted</Typography>
              </Grid>{" "}
            </Grid>
          </Grid>
        </Box>
      </>
    </Fragment>
  );
}
export default Searchbar;
