import {
  Card,
  CardActionArea,
  CardMedia,
  CardHeader,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import PropTypes from "prop-types";
import { Fragment } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
const CardComponent = ({
  img,
  title,
  subTitle,
  description,
  phone,
  cardNumber,
  id,
  onDelete,
  onLike,
  onEdit,
  canEdit,
  canDelete,
  loggedIn,
  isFav,
  onImageClick,
  isItUsersCard,
}) => {
  const handleDeleteBtnClick = () => {
    onDelete(id);
  };
  const handleEditBtnClick = () => {
    onEdit(id);
  };
  const handleLikeBtnClick = () => {
    onLike(id);
  };

  const handleImageBtnClick = () => {
    onImageClick(id);
  };

  return (
    <Card square raised>
      <CardActionArea>
        <CardMedia component="img" image={img} onClick={handleImageBtnClick} />
        {isItUsersCard ? (
          <Typography component="h4" variant="h6" color="gold">
            This Card Is Yours &#127775;
          </Typography>
        ) : (
          <Typography component="h4" variant="h6">
            {" "}
            &#8192;
          </Typography>
        )}
      </CardActionArea>
      <CardHeader title={title} subheader={subTitle}></CardHeader>
      <CardContent>
        <Typography>{description}</Typography>
        <Typography>Phone: {phone}</Typography>
        <Typography>Card Number: {cardNumber}</Typography>
      </CardContent>
      <CardActions>
        <Button variant="text" color="primary">
          <LocalPhoneIcon />
        </Button>
        {canEdit ? (
          <Fragment>
            <Button variant="text" color="warning" onClick={handleEditBtnClick}>
              Edit
            </Button>
          </Fragment>
        ) : (
          ""
        )}
        {canDelete ? (
          <Fragment>
            <Button variant="text" color="error" onClick={handleDeleteBtnClick}>
              Delete
            </Button>
          </Fragment>
        ) : (
          ""
        )}
        {loggedIn ? (
          <Fragment>
            {isFav ? (
              <Button onClick={handleLikeBtnClick}>
                <FavoriteIcon />
              </Button>
            ) : (
              <Button onClick={handleLikeBtnClick}>
                <FavoriteBorderIcon />
              </Button>
            )}
          </Fragment>
        ) : (
          ""
        )}
      </CardActions>
    </Card>
  );
};

CardComponent.propTypes = {
  id: PropTypes.string,
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  canEdit: PropTypes.bool,
};

CardComponent.defaultProps = {
  img: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K",
  subTitle: "",
  canEdit: false,
};

export default CardComponent;
