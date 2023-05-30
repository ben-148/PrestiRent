import { Box, CircularProgress, Grid, Button } from "@mui/material";
import { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

import CardComponent from "../components/CardComponent";

const FavoritesPage = () => {
  const [cardsArr, setCardsArr] = useState(null);
  const navigate = useNavigate();
  const payload = useSelector((bigPie) => bigPie.authSlice.payload);

  useEffect(() => {
    axios
      .get("/cards/get-my-fav-cards")
      .then(({ data }) => {
        setCardsArr(data);
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

  const handleDeleteFromFavorites = async (id) => {
    try {
      await axios.patch(`cards/card-like/${id}`);
      setCardsArr((prevArr) => prevArr.filter((card) => card._id !== id));
      toast.success("Card deleted successfully");
    } catch (err) {
      console.log("Error deleting card", err.response.data);
      toast.error("Failed to delete card");
    }
  };

  const handleEditFromInitialCardsArr = (id) => {
    navigate(`/edit/${id}`);
  };

  const cardProfileClick = (id) => {
    console.log("Clicked card id:", id);
    navigate(`/cardData/${id}`);
  };

  return (
    <Fragment>
      <Box textAlign="center">
        <h1>Your Favorite Cards</h1>
      </Box>
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
                  isItUsersCard={payload && payload._id === item.user_id}
                  onEdit={handleEditFromInitialCardsArr}
                  canEdit={
                    payload && payload.biz && payload._id === item.user_id
                  }
                  canDelete={
                    (payload && payload.isAdmin) ||
                    (payload && payload.biz && payload._id === item.user_id)
                  }
                  onImageClick={cardProfileClick}
                />
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDeleteFromFavorites(item._id)}
                >
                  <FavoriteBorderIcon />
                  Delete from favorites
                </Button>
              </Grid>
            ))}
        </Grid>
      </Box>
    </Fragment>
  );
};

export default FavoritesPage;
