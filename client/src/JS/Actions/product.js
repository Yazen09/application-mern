import axios from "axios";
import {
    ADD_PRODUCT,
    FAIL_PRODUCTS,
    GET_PRODUCT,
    GET_PRODUCTS,
    LOAD_PRODUCTS,
    DELETE_PRODUCT,
    UPDATE_PRODUCT
} from "../ActionTypes/product";

export const getProducts = () => async (dispatch) => {
    dispatch({ type: LOAD_PRODUCTS });
    try {
        let result = await axios.get("/api/product/allproducts");
        dispatch({ type: GET_PRODUCTS, payload: result.data });
    } catch (error) {
        dispatch({ type: FAIL_PRODUCTS, payload: error.response });
    }
};


export const addProduct = (newProduct, navigate) => async (dispatch) => {
  dispatch({ type: LOAD_PRODUCTS });
  try {
    const config = {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    };

    let result = await axios.post("/api/product/addProduct", newProduct, config);

    dispatch({ type: ADD_PRODUCT, payload: result.data });
    
    navigate("/products");
    
    dispatch(getProducts());
  } catch (error) {
    dispatch({ type: FAIL_PRODUCTS, payload: error.response });
  }
};


export const deleteProduct = (id) => async (dispatch) => {
    dispatch({ type: LOAD_PRODUCTS });
    try {
        await axios.delete(`/api/product/${id}`);
        dispatch(getProducts());
    } catch (error) {
        dispatch({ type: FAIL_PRODUCTS, payload: error.response });
    }
};

export const editProduct = (id, updatedProduct) => async (dispatch) => {
    dispatch({ type: LOAD_PRODUCTS });
    try {
        await axios.put(`/api/product/${id}`, updatedProduct);
        dispatch(getProducts());
    } catch (error) {
        dispatch({ type: FAIL_PRODUCTS, payload: error.response });
    }
};

export const getOneProduct = (id) => async (dispatch) => {
    dispatch({ type: LOAD_PRODUCTS });
    try {
        let result = await axios.get(`/api/product/${id}`);
        dispatch({ type: GET_PRODUCT, payload: result.data });
    } catch (error) {
        dispatch({ type: FAIL_PRODUCTS, payload: error.response });
    }
};
