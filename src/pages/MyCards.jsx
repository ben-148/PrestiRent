import { Box, CircularProgress, Grid, Button, IconButton } from "@mui/material";
import { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import ROUTES from "../routes/ROUTES";

import CardComponent from "../components/CardComponent";

const MyCardPage = () => {
  const [cardsArr, setCardsArr] = useState(null);
  const [favoriteStatus, setFavoriteStatus] = useState({}); // Added state for favorite status
  const payload = useSelector((bigPie) => bigPie.authSlice.payload);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/cards/my-cards")
      .then(({ data }) => {
        setCardsArr(data);
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
        console.log("err from axios", err);
        toast.error("Oops");
      });
  }, []);

  const handleDeleteFromInitialCardsArr = async (id) => {
    try {
      await axios.delete("/cards/" + id);
      setCardsArr((newCardsArr) =>
        newCardsArr.filter((item) => item._id !== id)
      );
      toast.success("🦄 Card deleted :)");
    } catch (err) {
      console.log("error when deleting", err.response.data);
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
      console.log("error when liking", err.response.data);
    }
  };

  const handleEditFromInitialCardsArr = (id) => {
    navigate(`/edit/${id}`);
  };

  const cardProfileClick = (id) => {
    console.log("Clicked card id:", id);
    navigate(`/cardData/${id}`);
  };

  const handleClickOpen = () => {
    navigate(ROUTES.CREATE);
  };

  return (
    <Fragment>
      <h1>My Cards</h1>
      <Box>
        <Grid container spacing={2}>
          {Array.isArray(cardsArr) &&
            cardsArr.map((item) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={item._id + Date.now()}
              >
                <CardComponent
                  id={item._id}
                  title={item.title}
                  subTitle={item.subTitle}
                  description={item.description}
                  img={item.image ? item.image.url : ""}
                  onDelete={handleDeleteFromInitialCardsArr}
                  onEdit={handleEditFromInitialCardsArr}
                  onLike={handleLikeFromInitialCardsArr}
                  canEdit={
                    payload && payload.biz && payload._id === item.user_id
                  }
                  loggedIn={payload}
                  canDelete={
                    (payload && payload.isAdmin) ||
                    (payload && payload.biz && payload._id === item.user_id)
                  }
                  isFav={favoriteStatus[item._id]}
                  isItUsersCard={payload && payload._id === item.user_id}
                  onImageClick={cardProfileClick}
                />
              </Grid>
            ))}
        </Grid>
        {!cardsArr && (
          <div style={{ textAlign: "center" }}>
            <CircularProgress />
          </div>
        )}
        {Array.isArray(cardsArr) && cardsArr.length === 0 && (
          <div style={{ textAlign: "center" }}>
            <h3>No cards found</h3>
          </div>
        )}
      </Box>
      <IconButton
        color="inherit"
        size="medium"
        style={{ float: "right" }}
        onClick={handleClickOpen}
      >
        <AddIcon /> Add Card
      </IconButton>{" "}
    </Fragment>
  );
};

export default MyCardPage;
