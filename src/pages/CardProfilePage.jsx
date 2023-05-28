import React, { Fragment, useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import atom from "../logo.svg";

const CardProfile = () => {
  const navigate = useNavigate();
  const [bizNumberState, setBizNumberState] = useState(null);
  const { id } = useParams();
  const [cardState, setCardState] = useState(null);

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const response = await axios.get(`/cards/card/${id}`);
        const cardData = response.data;

        const newCardState = {
          ...cardData,
        };

        if (cardData.image && cardData.image.url) {
          newCardState.url = cardData.image.url;
        } else {
          newCardState.url = "";
        }

        if (cardData.image && cardData.image.alt) {
          newCardState.alt = cardData.image.alt;
        } else {
          newCardState.alt = "";
        }

        delete newCardState.image;
        delete newCardState.__v;
        delete newCardState._id;
        delete newCardState.user_id;

        if (!newCardState.zipCode || newCardState.zipCode <= 1) {
          delete newCardState.zipCode;
        }

        !newCardState.web && delete newCardState.web;
        !newCardState.state && delete newCardState.state;

        newCardState.createdAt = new Date(
          newCardState.createdAt
        ).toLocaleDateString("hi");

        setCardState(newCardState);
        setBizNumberState(newCardState.bizNumber);
      } catch (error) {
        toast.error("Failed to fetch card data");
      }
    };

    fetchCardData();
  }, [id]);

  const handleCancelBtnClick = () => {
    navigate("/");
  };

  const handleAlertOpen = (message) => {
    const result = window.confirm(message);
    updateBizNumber(result);
  };

  const updateBizNumber = async (result) => {
    if (!result) {
      return;
    }

    try {
      await axios.patch(`/cards/bizNumber/${id}`);
      const { data } = await axios.get(`/cards/card/${id}`);
      setBizNumberState(data.bizNumber);
      toast.success("Business number updated successfully");
    } catch (error) {
      toast.error("Failed to update business number");
    }
  };

  if (!cardState) {
    return <CircularProgress />;
  }

  const cardKeys = Object.keys(cardState);

  return (
    <Container component="main" maxWidth="lg">
      <Box sx={{ mt: 3 }}>
        <Button variant="outlined" onClick={handleCancelBtnClick}>
          <FirstPageIcon />
          Back to Home
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 4,
        }}
      >
        <img
          src={cardState.url ? cardState.url : atom}
          alt={cardState.alt ? cardState.alt : ""}
          style={{ height: 300, width: "auto" }}
        />
      </Box>
      <Box sx={{ mt: 4 }}>
        <Grid container spacing={2}>
          {cardKeys.map((propOfCard) =>
            propOfCard !== "url" && propOfCard !== "alt" ? (
              <Grid key={propOfCard} item xs={12} sm={6} md={4}>
                <Typography variant="h6" gutterBottom sx={{ color: "primary" }}>
                  <Button
                    color="info"
                    variant="contained"
                    disabled
                    style={{ marginBottom: 10 }}
                  >
                    {propOfCard}
                  </Button>
                  {propOfCard === "bizNumber" ? (
                    <Fragment>
                      {bizNumberState ? (
                        <Typography variant="h6">
                          Business Number: {bizNumberState}
                        </Typography>
                      ) : (
                        <Typography variant="h6">
                          Business Number: {cardState.bizNumber}
                        </Typography>
                      )}
                      <Button
                        variant="contained"
                        onClick={() =>
                          handleAlertOpen(
                            "Are you sure you want to change the card business number?"
                          )
                        }
                        style={{ marginTop: 10 }}
                      >
                        Change Business Number
                      </Button>
                    </Fragment>
                  ) : propOfCard === "web" ? (
                    <Link
                      href={cardState.web}
                      underline="hover"
                      target="_blank"
                    >
                      Visit Website
                    </Link>
                  ) : propOfCard === "likes" ? (
                    <Fragment>
                      {cardState.likes.length}
                      <FavoriteBorderIcon sx={{ ml: 1 }} color="error" />
                    </Fragment>
                  ) : (
                    <Typography variant="h6">
                      {cardState[propOfCard]}
                    </Typography>
                  )}
                </Typography>
              </Grid>
            ) : null
          )}
        </Grid>
      </Box>
    </Container>
  );
};

export default CardProfile;
