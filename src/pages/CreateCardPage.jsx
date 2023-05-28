import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import ROUTES from "../routes/ROUTES";
import validateEditSchema from "../validation/editValidation";
import { CircularProgress } from "@mui/material";
import atom from "../logo.svg";
import { toast } from "react-toastify";

const CreateCardPage = () => {
  const [inputState, setInputState] = useState({
    url: "",
    title: "",
    description: "",
    subTitle: "",
    phone: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    email: "",
  });
  const [inputsErrorsState, setInputsErrorsState] = useState({});
  const navigate = useNavigate();
  const handleSaveBtnClick = async (ev) => {
    try {
      const joiResponse = validateEditSchema(inputState);
      setInputsErrorsState(joiResponse);
      console.log(joiResponse);
      if (!joiResponse) {
        //move to homepage
        if (!inputState.url) {
          inputState.url = `${atom}`;
        }
        await axios.post("/cards/", inputState);
        toast.success("🦄 Wow so easy");
        navigate(ROUTES.HOME);
      }
    } catch (err) {
      console.log("err", err);
      toast.error("errrrrrrrrrrrrrrrror");
    }
  };
  const handleCancelBtnClick = (ev) => {
    //move to homepage
    navigate(ROUTES.HOME);
  };
  const handleInputChange = (ev) => {
    let newInputState = JSON.parse(JSON.stringify(inputState));
    newInputState[ev.target.id] = ev.target.value;
    setInputState(newInputState);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <EditIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create card
        </Typography>
        <Box
          component="img"
          sx={{
            height: 233,
            width: 350,
            maxHeight: { xs: 233, md: 167 },
            maxWidth: { xs: 350, md: 250 },
          }}
          alt={inputState.alt ? inputState.alt : ""}
          src={inputState.url ? inputState.url : atom}
          //src={inputState.url ? inputState.url : atom}
        />
        <Box component="div" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="url"
                label="Url"
                name="url"
                autoComplete="url"
                value={inputState.url}
                onChange={handleInputChange}
              />
              {inputsErrorsState && inputsErrorsState.url && (
                <Alert severity="warning">
                  {inputsErrorsState.url.map((item) => (
                    <div key={"url-errors" + item}>{item}</div>
                  ))}
                </Alert>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="title"
                label="Title"
                name="title"
                autoComplete="title"
                value={inputState.title}
                onChange={handleInputChange}
              />
              {inputsErrorsState && inputsErrorsState.title && (
                <Alert severity="warning">
                  {inputsErrorsState.title.map((item) => (
                    <div key={"title-errors" + item}>{item}</div>
                  ))}
                </Alert>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="subTitle"
                label="Sub title"
                type="text"
                id="subTitle"
                autoComplete="subTitle"
                value={inputState.subTitle}
                onChange={handleInputChange}
              />
              {inputsErrorsState && inputsErrorsState.subTitle && (
                <Alert severity="warning">
                  {inputsErrorsState.subTitle.map((item) => (
                    <div key={"subTitle-errors" + item}>{item}</div>
                  ))}
                </Alert>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="description"
                label="Description"
                id="description"
                autoComplete="description"
                value={inputState.description}
                onChange={handleInputChange}
              />
              {inputsErrorsState && inputsErrorsState.description && (
                <Alert severity="warning">
                  {inputsErrorsState.description.map((item) => (
                    <div key={"description-errors" + item}>{item}</div>
                  ))}
                </Alert>
              )}
            </Grid>
            {/*             <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="country"
                label="country"
                id="country"
                autoComplete="country"
                value={inputState.country}
                onChange={handleInputChange}
              />
              {inputsErrorsState && inputsErrorsState.country && (
                <Alert severity="warning">
                  {inputsErrorsState.country.map((item) => (
                    <div key={"country-errors" + item}>{item}</div>
                  ))}
                </Alert>
              )}
            </Grid>
 */}{" "}
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="E-Mail"
                label="E-Mail"
                id="email"
                autoComplete="E-Mail"
                value={inputState.email}
                onChange={handleInputChange}
              />
              {inputsErrorsState && inputsErrorsState.email && (
                <Alert severity="warning">
                  {inputsErrorsState.email.map((item) => (
                    <div key={"email-errors" + item}>{item}</div>
                  ))}
                </Alert>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="country"
                label="country"
                id="country"
                autoComplete="country"
                value={inputState.country}
                onChange={handleInputChange}
              />
              {inputsErrorsState && inputsErrorsState.country && (
                <Alert severity="warning">
                  {inputsErrorsState.country.map((item) => (
                    <div key={"country-errors" + item}>{item}</div>
                  ))}
                </Alert>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="city"
                label="city"
                id="city"
                autoComplete="city"
                value={inputState.city}
                onChange={handleInputChange}
              />
              {inputsErrorsState && inputsErrorsState.city && (
                <Alert severity="warning">
                  {inputsErrorsState.city.map((item) => (
                    <div key={"city-errors" + item}>{item}</div>
                  ))}
                </Alert>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="street"
                label="street"
                id="street"
                autoComplete="street"
                value={inputState.street}
                onChange={handleInputChange}
              />
              {inputsErrorsState && inputsErrorsState.street && (
                <Alert severity="warning">
                  {inputsErrorsState.street.map((item) => (
                    <div key={"street-errors" + item}>{item}</div>
                  ))}
                </Alert>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="House Number"
                label="House Number"
                id="houseNumber"
                autoComplete="House Number"
                value={inputState.houseNumber}
                onChange={handleInputChange}
              />
              {inputsErrorsState && inputsErrorsState.houseNumber && (
                <Alert severity="warning">
                  {inputsErrorsState.houseNumber.map((item) => (
                    <div key={"description-errors" + item}>{item}</div>
                  ))}
                </Alert>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="phone"
                label="Phone"
                id="phone"
                autoComplete="phone"
                value={inputState.phone}
                onChange={handleInputChange}
              />
              {inputsErrorsState && inputsErrorsState.description && (
                <Alert severity="warning">
                  {inputsErrorsState.description.map((item) => (
                    <div key={"description-errors" + item}>{item}</div>
                  ))}
                </Alert>
              )}
            </Grid>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSaveBtnClick}
              >
                Save
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleCancelBtnClick}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
          {/* <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => {
              navigate("/edit/2");
            }}
          >
            edit 2
          </Button> */}
          {/* <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to={ROUTES.REGISTER}>
                <Typography variant="body2">
                  Did not have an account? Sign up
                </Typography>
              </Link>
            </Grid>
          </Grid> */}
        </Box>
      </Box>
    </Container>
  );
};
export default CreateCardPage;
