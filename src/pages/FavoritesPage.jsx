import { Box, CircularProgress, Grid, Button } from "@mui/material";
import { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

import CardComponent from "../components/CardComponent";

const FavoritesPage = () => {
  const [cardsArr, setCardsArr] = useState(null);

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

  return (
    <Fragment>
      <h1>Favorites page</h1>
      <Box>
        <Grid container spacing={2}>
          {Array.isArray(cardsArr) &&
            cardsArr.map((item) => (
              <Grid item xs={4} key={item._id + Date.now()}>
                <CardComponent
                  id={item._id}
                  title={item.title}
                  subTitle={item.subTitle}
                  description={item.description}
                  img={item.image ? item.image.url : ""}
                />
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDeleteFromFavorites(item._id)}
                >
                  Delete
                </Button>
              </Grid>
            ))}
        </Grid>
      </Box>
    </Fragment>
  );
};

export default FavoritesPage;
