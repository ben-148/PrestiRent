import React from "react";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardHeader,
  CardContent,
  Typography,
  CardActions,
  Button,
  Grid,
} from "@mui/material";

const AboutPage = () => {
  const cardStyle = {
    display: "flex",
    marginBottom: "16px",
  };

  const mediaStyle = {
    width: 300,
    objectFit: "cover",
  };

  const contentStyle = {
    flex: 1,
  };

  return (
    <div style={{ padding: "24px" }}>
      <Typography
        variant="h3"
        component="h1"
        align="center"
        style={{ marginBottom: "16px" }}
      >
        About PrestiRent
      </Typography>
      <Typography variant="body1" paragraph>
        PrestiRent is a premier platform that connects businesses offering
        prestigious cars for rent with individuals in search of a luxurious
        driving experience. Our mission is to provide a seamless and
        extraordinary car rental service, offering a curated selection of
        high-end vehicles.
      </Typography>
      <Typography variant="body1" paragraph>
        As a business customer, you can create an account on PrestiRent and
        advertise your luxury cars for rent. Showcase your vehicles to a
        discerning audience and attract potential customers who appreciate the
        finer things in life.
      </Typography>
      <Typography variant="h5" component="h2" style={{ marginBottom: "16px" }}>
        Platform Features
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Card style={cardStyle}>
            <CardMedia
              style={mediaStyle}
              component="img"
              alt="Car 1"
              image="https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/2021_Ferrari_F8_Tributo.jpg/800px-2021_Ferrari_F8_Tributo.jpg"
              title="Car 1"
            />
            <CardContent style={contentStyle}>
              <Typography variant="h6" component="h3">
                Discover a wide range of prestigious cars available for rent
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Find the perfect car that matches your style and preferences
                from our extensive collection of high-end vehicles.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card style={cardStyle}>
            <CardMedia
              style={mediaStyle}
              component="img"
              alt="Car 2"
              image="https://images.hindustantimes.com/auto/img/2022/06/15/600x338/Lamborghini_Aventador_Ultimae_Roadster_1655282971884_1655282978599.jpeg"
              title="Car 2"
            />
            <CardContent style={contentStyle}>
              <Typography variant="h6" component="h3">
                Connect directly with businesses offering rental services
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Communicate directly with reputable car rental businesses to
                ensure a seamless rental experience.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default AboutPage;
