import axios from "axios";
import { ADD_CONTACT, FAIL_CONTACTS, GET_CONTACT, GET_CONTACTS, LOAD_CONTACTS } from "../ActionTypes/contact";

export const getContacts = () => async (dispatch) => {
    dispatch({ type: LOAD_CONTACTS });
    try {
        let result = await axios.get("/api/contacts/alluser");
        dispatch({ type: GET_CONTACTS, payload: result.data });
    } catch (error) {
        dispatch({ type: FAIL_CONTACTS, payload: error.response });
    }
};

export const addContact = (newContact, navigate) => async (dispatch) => {
    dispatch({ type: LOAD_CONTACTS });
    try {
        const config = {
            headers: {
                authorization: localStorage.getItem("token"),
            },
        };
        let result = await axios.post("/api/contacts/add-contact", newContact, config);
        dispatch({ type: ADD_CONTACT, payload: result.data });
        navigate('/listcontacts');
        dispatch(getContacts());
    } catch (error) {
        dispatch({ type: FAIL_CONTACTS, payload: error.response });
    }
};

export const deleteContact = (id) => async (dispatch) => {
    dispatch({ type: LOAD_CONTACTS });
    try {
        await axios.delete(`/api/contacts/${id}`);
        dispatch(getContacts());
    } catch (error) {
        dispatch({ type: FAIL_CONTACTS, payload: error.response });
    }
};


export const editContact = (id, newContact, navigate) => async (dispatch) => {
    dispatch({ type: LOAD_CONTACTS });
    try {
        await axios.put(`/api/contacts/${id}`, newContact);
        dispatch({ type: "EDIT_CONTACT" }); 
        navigate("/listcontacts"); 
        dispatch(getContacts());
        setTimeout(() => {
            dispatch({ type: "RESET_EDIT_SUCCESS" }); 
        }, 500);
    } catch (error) {
        dispatch({ type: FAIL_CONTACTS, payload: error.response });
    }
};

export const getOneContact = (id) => async (dispatch) => {
    dispatch({ type: LOAD_CONTACTS });
    try {
        let result = await axios.get(`/api/contact/${id}`);
        dispatch({ type: GET_CONTACT, payload: result.data });
    } catch (error) {
        dispatch({ type: FAIL_CONTACTS, payload: error.response });
    }
};
