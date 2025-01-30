import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMatch, useNavigate } from "react-router-dom";
import { editContact, getOneContact } from "../../JS/Actions/contact";
import { Button, TextField } from "@mui/material";

const EditContact = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const match = useMatch("/EditContact/:id");

    const [newContact, setNewContact] = useState({
        name: "",
        email: "",
        phone: "",
    });
    const [file, setFile] = useState(null);

    const contactToGet = useSelector((state) => state.contactReducer.contactToGet);

    // Charger le contact à éditer
    useEffect(() => {
        dispatch(getOneContact(match.params.id));
    }, [dispatch, match.params.id]);

    // Mettre à jour le state avec les infos du contact
    useEffect(() => {
        if (contactToGet) {
            setNewContact({
                name: contactToGet.name || "",
                email: contactToGet.email || "",
                phone: contactToGet.phone || "",
            });
        }
    }, [contactToGet]);

    // Gérer les changements des inputs
    const handleChange = (e) => {
        setNewContact({ ...newContact, [e.target.name]: e.target.value });
    };

    // Gérer le changement de photo
    const handlePhoto = (e) => {
        setFile(e.target.files[0]);
    };

    // Gérer l'édition du contact
    const handleEdit = (e) => {
        e.preventDefault();
        let data = new FormData();
        data.append("name", newContact.name);
        data.append("phone", newContact.phone);
        data.append("email", newContact.email);
        if (file) data.append("image", file);

        dispatch(editContact(match.params.id, data, navigate)); // ✅ Ajout de navigate
    };

    return (
        <div>
            <h1>Edit contact</h1>

            <TextField
                id="standard-basic"
                type="text"
                label="Nom"
                variant="standard"
                value={newContact.name}
                onChange={handleChange}
                name="name"
            />
            <br /><br />
            <TextField
                id="standard-basic"
                type="email"
                label="Email"
                variant="standard"
                value={newContact.email}
                onChange={handleChange}
                name="email"
            />
            <br /><br />
            <TextField
                id="standard-basic"
                type="number"
                label="Téléphone"
                variant="standard"
                value={newContact.phone}
                onChange={handleChange}
                name="phone"
            />
            <br /><br />
            <input type="file" id="file-input" onChange={handlePhoto} />
            <br /><br />
            <Button variant="contained" color="success" onClick={handleEdit}>
                Edit
            </Button>
        </div>
    );
};

export default EditContact;
