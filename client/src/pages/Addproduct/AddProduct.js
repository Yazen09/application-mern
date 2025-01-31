import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField, Button, Paper, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../../JS/Actions/product";

const AddProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userReducer); 
  const token = localStorage.getItem("token");

  const [productData, setProductData] = useState({
    date: "",
    numserie: "",
    reference: "",
    categorie: "",
    id_user: "", 
  });

  const [file, setFile] = useState(null); 
  const [filePreview, setFilePreview] = useState(null); 
  const [message, setMessage] = useState(""); 
  const [error, setError] = useState(""); 
  const [validationError, setValidationError] = useState(""); 

 
  useEffect(() => {
    if (user) {
      const today = new Date();
      const dateString = today.toISOString().split("T")[0]; 
      setProductData((prevState) => ({
        ...prevState,
        id_user: user._id, 
        date: dateString, 
      }));
    }
  }, [user]);

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      setFilePreview(URL.createObjectURL(selectedFile));
      setValidationError(""); 
    }
  };

  const handleAdd = (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!productData.numserie || !productData.reference || !productData.categorie || !file) {
      setError("Tous les champs requis doivent être remplis !");
      return;
    }

    const formData = new FormData();
    formData.append("id_user", productData.id_user);
    formData.append("date", productData.date);
    formData.append("numserie", productData.numserie);
    formData.append("reference", productData.reference);
    formData.append("categorie", productData.categorie);
    formData.append("image", file);

    dispatch(addProduct(formData, navigate)); 
  };

  return (
    <Paper style={{ padding: 20, maxWidth: 500, margin: "20px auto" }}>
      <h1>Add Product</h1>

      {message && (
        <div style={{ color: "green", marginBottom: 20 }}>
          <strong>Success:</strong> {message}
        </div>
      )}

      {error && (
        <div style={{ color: "red", marginBottom: 20 }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      <form onSubmit={handleAdd}>
        <TextField
          label="User ID"
          name="id_user"
          value={productData.id_user || ""}
          fullWidth
          margin="normal"
          InputProps={{
            readOnly: true, 
          }}
        />

        <TextField
          label="Date"
          name="date"
          value={productData.date}
          fullWidth
          margin="normal"
          InputProps={{
            readOnly: true, 
          }}
        />

        <TextField
          label="Serial Number"
          name="numserie"
          value={productData.numserie}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Reference</InputLabel>
          <Select
            name="reference"
            value={productData.reference}
            onChange={handleChange}
            required
          >
            <MenuItem value="Ref1">Ref1</MenuItem>
            <MenuItem value="Ref2">Ref2</MenuItem>
            <MenuItem value="Ref3">Ref3</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Category</InputLabel>
          <Select
            name="categorie"
            value={productData.categorie}
            onChange={handleChange}
            required
          >
            <MenuItem value="Category1">Category1</MenuItem>
            <MenuItem value="Category2">Category2</MenuItem>
            <MenuItem value="Category3">Category3</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="contained"
          component="label"
          style={{ marginTop: 20, marginBottom: 10 }}
        >
          Upload Image
          <input type="file" hidden onChange={handleFileChange} />
        </Button>

        {filePreview && (
          <div style={{ marginTop: 20 }}>
            <img src={filePreview} alt="Preview" style={{ maxWidth: "100%", maxHeight: "200px" }} />
          </div>
        )}

        {/* Submit button */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: 20 }}
        >
          Add Product
        </Button>
      </form>
    </Paper>
  );
};

export default AddProduct;
