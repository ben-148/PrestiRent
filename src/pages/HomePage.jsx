import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import CardComponent from "../components/CardComponent";
import { toast } from "react-toastify";
import useQueryParams from "../hooks/useQueryParams";
import { useSelector } from "react-redux";

const HomePage = () => {
  const [originalCardsArr, setOriginalCardsArr] = useState(null);
  const [cardsArr, setCardsArr] = useState(null);
  const [favoriteStatus, setFavoriteStatus] = useState({}); // Added state for favorite status

  const navigate = useNavigate();
  let qparams = useQueryParams();
  const payload = useSelector((bigPie) => bigPie.authSlice.payload);

  const filterFunc = useCallback(
    (data) => {
      if (!originalCardsArr && !data) {
        return;
      }
      let filter = "";
      if (qparams.filter) {
        filter = qparams.filter;
      }
      if (!originalCardsArr && data) {
        setOriginalCardsArr(data);
        setCardsArr(
          data.filter(
            (card) =>
              card.title.startsWith(filter) || card.bizNumber.startsWith(filter)
          )
        );
        return;
      }
      if (originalCardsArr) {
        let newOriginalCardsArr = JSON.parse(JSON.stringify(originalCardsArr));
        setCardsArr(
          newOriginalCardsArr.filter(
            (card) =>
              card.title.startsWith(filter) || card.bizNumber.startsWith(filter)
          )
        );
      }
    },
    [originalCardsArr, qparams.filter]
  );

  useEffect(() => {
    axios
      .get("/cards/cards")
      .then(({ data }) => {
        filterFunc(data);
        setFavoriteStatus(
          data.reduce(
            (status, card) => ({
              ...status,
              [card._id]: card.likes.includes(payload?._id),
            }),
            {}
          )
        );
      })
      .catch((err) => {
        toast.error("something wrong");
      });
  }, [filterFunc, payload?._id]);

  useEffect(() => {
    filterFunc();
  }, [filterFunc, qparams.filter]);
  const handleDeleteFromInitialCardsArr = async (id) => {
    try {
      await axios.delete("/cards/" + id); // /cards/:id
      setCardsArr((newCardsArr) =>
        newCardsArr.filter((item) => item._id !== id)
      );
      toast.success("🦄 Card deleted :) ");
    } catch (err) {
      toast.error(err.response.data);
    }
  };
  const handleLikeFromInitialCardsArr = async (id) => {
    try {
      const response = await axios.patch("cards/card-like/" + id);
      const updatedStatus = !favoriteStatus[id]; // Calculate the updated favorite status
      setFavoriteStatus((prevStatus) => ({
        ...prevStatus,
        [id]: updatedStatus,
      }));
      const toastMessage = updatedStatus
        ? "🦄 Card added to favorites :)"
        : "🦄 Card removed from favorites ";
      toast.success(toastMessage);
    } catch (err) {
      toast.error("error when liking", err.response.data);
    }
  };
  const handleEditFromInitialCardsArr = (id) => {
    navigate(`/edit/${id}`);
  };

  const cardProfileClick = (id) => {
    navigate(`/cardData/${id}`);
  };

  if (!cardsArr) {
    return <CircularProgress />;
  }

  return (
    <Box textAlign="center">
      <Typography
        variant="h1"
        style={{ fontFamily: "'Leckerli One', cursive" }}
      >
        PrestiRent
      </Typography>
      <Typography
        variant="h2"
        style={{
          fontFamily: "'Playfair Display', serif",
        }}
      >
        Elevate Your Journey in Style
      </Typography>
      <Typography
        variant="h4"
        style={{ fontFamily: "'Montserrat', sans-serif", marginBottom: "16px" }}
      >
        Rent Luxury Cars Around the World
      </Typography>

      <Grid container spacing={2}>
        {cardsArr.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item._id + Date.now()}>
            <CardComponent
              id={item._id}
              title={item.title}
              subTitle={item.subTitle}
              description={item.description}
              phone={item.phone}
              cardNumber={item.bizNumber}
              img={item.image ? item.image.url : ""}
              onDelete={handleDeleteFromInitialCardsArr}
              onEdit={handleEditFromInitialCardsArr}
              onLike={handleLikeFromInitialCardsArr}
              canEdit={payload && payload.biz && payload._id === item.user_id}
              loggedIn={payload}
              canDelete={
                (payload && payload.isAdmin) ||
                (payload && payload.biz && payload._id === item.user_id)
              }
              isFav={favoriteStatus[item._id]}
              onImageClick={cardProfileClick}
              isItUsersCard={payload && payload._id === item.user_id}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HomePage;
