import { Box, CircularProgress, Grid, Button } from "@mui/material";
import { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

import CardComponent from "../components/CardComponent";

const MyCardPage = () => {
  const [cardsArr, setCardsArr] = useState(null);

  useEffect(() => {
    axios
      .get("/cards/my-cards")
      .then(({ data }) => {
        setCardsArr(data);
      })
      .catch((err) => {
        console.log("err from axios", err);
        toast.error("Oops");
      });
  }, []);

  return (
    <Fragment>
      <h1>My Cards</h1>
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
              </Grid>
            ))}
        </Grid>
      </Box>
    </Fragment>
  );
};

export default MyCardPage;
