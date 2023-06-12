import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  Paper,
  Button,
  Typography,
  Divider,
} from "@mui/material";
import { toast } from "react-toastify";
import ROUTES from "../routes/ROUTES";
import { useNavigate } from "react-router-dom";

const CRMPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState({});
  useEffect(() => {
    axios
      .get("users/getAllUsers")
      .then(({ data: { users } }) => {
        setUsers(users);
      })
      .catch((error) => {});
  }, []);

  const handleDeleteUser = (userId) => {
    axios.delete(`users/deleteUser/` + userId).then(() => {
      setUsers(users.filter((user) => user._id !== userId));
    });
  };

  const handleUserMode = async (ev) => {
    try {
      let newUsersArr = JSON.parse(JSON.stringify(users));
      let currentUser = newUsersArr.find((user) => user._id === ev.target.id);
      await axios.put("/users/userInfo/" + currentUser._id, {
        firstName: currentUser.firstName,
        middleName: currentUser.middleName,
        lastName: currentUser.lastName,
        phone: currentUser.phone,
        email: currentUser.email,
        imageUrl: currentUser.imageUrl,
        imageAlt: currentUser.imageAlt,
        state: currentUser.state,
        country: currentUser.country,
        city: currentUser.city,
        street: currentUser.street,
        houseNumber: currentUser.houseNumber,
        zipCode: currentUser.zipCode,
        biz: !currentUser.biz,
      });
      currentUser.biz = !currentUser.biz;
      newUsersArr = newUsersArr.map((user) => {
        if (user._id === currentUser._id) {
          return { ...currentUser };
        }
        return user;
      });
      setUsers(newUsersArr);
    } catch (err) {
      toast.error("ERR: something went wrong.");
    }
  };
  const whenUserClicked = (ev) => {
    navigate(`${ROUTES.PROFILECRM}/${ev.target.id}`);
  };
  return (
    <div>
      <Typography variant="h2" color="primary" align="center">
        CRM Admin Panel
      </Typography>
      <Typography variant="h6" color="warning">
        Introducing the CRM Administrator Dashboard, your centralized command
        center for effectively overseeing and arranging user data. This dynamic
        solution enables you to easily categorize individuals as either
        corporate or non-corporate users, granting you extensive authority over
        their profiles and permissions. Featuring an intuitive interface and a
        strong table presenting all crucial user details, this administrative
        dashboard streamlines the task of monitoring and structuring user
        information.
      </Typography>
      <br />
      <Divider></Divider>
      <br />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Type of Account</TableCell>
              <TableCell>Actions</TableCell>
              <TableCell>Is Admin?</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length ? (
              users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user._id}</TableCell>
                  <TableCell>{user.firstName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {user.biz ? "business account" : "simple user"}
                  </TableCell>
                  <TableCell>
                    {!user.isAdmin && (
                      <>
                        <Button
                          id={user._id}
                          variant="contained"
                          color="warning"
                          onClick={handleUserMode}
                        >
                          {user.biz
                            ? "change to regular user"
                            : "change to bussines user"}
                        </Button>
                        <Button
                          id={user._id}
                          variant="contained"
                          color="error"
                          onClick={() => handleDeleteUser(user._id)}
                        >
                          Delete
                        </Button>
                      </>
                    )}
                    <Button
                      id={user._id}
                      variant="contained"
                      color="success"
                      onClick={whenUserClicked}
                    >
                      Show more details
                    </Button>
                  </TableCell>
                  <TableCell>{user.isAdmin ? "Yes" : "No"}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6}>No users found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>{" "}
    </div>
  );
};

export default CRMPage;
