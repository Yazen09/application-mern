import { Button, CircularProgress, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addContact } from "../../JS/Actions/contact";
import { Helmet } from "react-helmet";

const AddContact = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const load = useSelector((state) => state.contactReducer.load);

  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handlePhoto = (e) => {
    setFile(e.target.files[0]);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!contact.name || !contact.email || !contact.phone || !file) {
      alert("Tous les champs doivent être remplis !");
      return;
    }

    let data = new FormData();
    data.append("name", contact.name);
    data.append("phone", contact.phone);
    data.append("email", contact.email);
    data.append("image", file);
    dispatch(addContact(data, navigate));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "20px" }}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Add Contact</title>
        <link rel="canonical" />
        <meta name="description" content="add contact" />
      </Helmet>

      <h1>Add Contact</h1>

      <TextField label="Name" variant="outlined" onChange={handleChange} type="text" name="name" sx={{ mb: 2, width: "300px" }} />
      <TextField label="Email" variant="outlined" onChange={handleChange} type="email" name="email" sx={{ mb: 2, width: "300px" }} />
      <TextField label="Phone" variant="outlined" onChange={handleChange} type="number" name="phone" sx={{ mb: 2, width: "300px" }} />
      <input type="file" id="file-input" encType="multipart/form-data" onChange={handlePhoto} style={{ marginBottom: "20px" }} />

      {load ? (
        <Button variant="contained" color="success" onClick={handleAdd} disabled>
          <CircularProgress size="1.25rem" sx={{ color: "white", mr: 1 }} />
          ADD Contact
        </Button>
      ) : (
        <Button variant="contained" color="success" onClick={handleAdd}>
          ADD Contact
        </Button>
      )}
    </div>
  );
};

export default AddContact;
