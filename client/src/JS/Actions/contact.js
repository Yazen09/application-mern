import axios from "axios";
import { ADD_CONTACT, FAIL_CONTACTS, GET_CONTACT, GET_CONTACTS, LOAD_CONTACTS } from "../ActionTypes/contact";

export const getContacts = () => async (dispatch) => {
    dispatch({ type: LOAD_CONTACTS });
    try {
        let result = await axios.get("/api/contact/alluser");
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
        let result = await axios.post("/api/contact/add-contact", newContact, config);
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
        await axios.delete(`/api/contact/${id}`);
        dispatch(getContacts());
    } catch (error) {
        dispatch({ type: FAIL_CONTACTS, payload: error.response });
    }
};

// ✅ Modification ici pour inclure la redirection
export const editContact = (id, newContact, navigate) => async (dispatch) => {
    dispatch({ type: LOAD_CONTACTS });
    try {
        await axios.put(`/api/contact/${id}`, newContact);
        dispatch({ type: "EDIT_CONTACT" }); // ✅ Confirme que l'édition a réussi
        navigate("/listcontacts"); // ✅ Redirige après édition
        dispatch(getContacts());
        setTimeout(() => {
            dispatch({ type: "RESET_EDIT_SUCCESS" }); // ✅ Réinitialise l'état après la redirection
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
