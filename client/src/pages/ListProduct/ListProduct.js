import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../JS/Actions/product";
import { Table, TableHead, TableBody, TableCell, TableRow, TableContainer, Paper, CircularProgress } from "@mui/material";

const ListProduct = () => {
  const dispatch = useDispatch();

  const { listProducts = [], load } = useSelector((state) => state.productReducer) || {}; 

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div style={{ padding: 20 }}>
      <h1>Liste des Produits</h1>

      {load ? (
        <div style={{ textAlign: "center", margin: "20px 0" }}>
          <CircularProgress />
        </div>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID Utilisateur</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Numéro de série</TableCell>
                <TableCell>Référence</TableCell>
                <TableCell>Catégorie</TableCell>
                <TableCell>Image</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(listProducts) && listProducts.length > 0 ? (
                listProducts.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell>{product.id_user}</TableCell>
                    <TableCell>{product.date}</TableCell>
                    <TableCell>{product.numserie}</TableCell>
                    <TableCell>{product.reference}</TableCell>
                    <TableCell>{product.categorie}</TableCell>
                    <TableCell>
                      {product.product_img && (
                        <img
                          src={product.product_img}
                          alt="Product"
                          width="100"
                          height="100"
                          style={{ borderRadius: "5px" }}
                        />
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} style={{ textAlign: "center" }}>
                    Aucun produit disponible
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default ListProduct;
