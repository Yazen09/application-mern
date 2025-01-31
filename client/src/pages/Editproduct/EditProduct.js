import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMatch, useNavigate } from "react-router-dom";
import { editProduct, getOneProduct } from "../../JS/Actions/product";
import { Button, TextField } from "@mui/material";

const EditProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const match = useMatch("/EditProduct/:id");

    const [newProduct, setNewProduct] = useState({
        reference: "",
        numserie: "",
        categorie: "",
    });
    const [file, setFile] = useState(null);

    const productToGet = useSelector((state) => state.productReducer.productToGet);

    // Charger le produit à éditer
    useEffect(() => {
        dispatch(getOneProduct(match.params.id));
    }, [dispatch, match.params.id]);

    // Mettre à jour le state avec les infos du produit
    useEffect(() => {
        if (productToGet) {
            setNewProduct({
                reference: productToGet.reference || "",
                numserie: productToGet.numserie || "",
                categorie: productToGet.categorie || "",
            });
        }
    }, [productToGet]);

    // Gérer les changements des inputs
    const handleChange = (e) => {
        setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
    };

    // Gérer le changement de photo
    const handlePhoto = (e) => {
        setFile(e.target.files[0]);
    };

    // Gérer l'édition du produit
    const handleEdit = (e) => {
        e.preventDefault();
        let data = new FormData();
        data.append("reference", newProduct.reference);
        data.append("numserie", newProduct.numserie);
        data.append("categorie", newProduct.categorie);
        if (file) data.append("product_img", file);

        dispatch(editProduct(match.params.id, data, navigate));
    };

    return (
        <div>
            <h1>Modifier un produit</h1>

            <TextField
                id="standard-basic"
                type="text"
                label="Référence"
                variant="standard"
                value={newProduct.reference}
                onChange={handleChange}
                name="reference"
            />
            <br /><br />
            <TextField
                id="standard-basic"
                type="text"
                label="Numéro de série"
                variant="standard"
                value={newProduct.numserie}
                onChange={handleChange}
                name="numserie"
            />
            <br /><br />
            <TextField
                id="standard-basic"
                type="text"
                label="Catégorie"
                variant="standard"
                value={newProduct.categorie}
                onChange={handleChange}
                name="categorie"
            />
            <br /><br />
            <input type="file" id="file-input" onChange={handlePhoto} />
            <br /><br />
            <Button variant="contained" color="success" onClick={handleEdit}>
                Modifier
            </Button>
        </div>
    );
};

export default EditProduct;
