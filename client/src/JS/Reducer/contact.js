// importation
import { FAIL_CONTACTS, GET_CONTACT, GET_CONTACTS, LOAD_CONTACTS } from "../ActionTypes/contact";

// initialeState
const initialState = {
    listContacts: [],
    contactToGet: {},
    load: false,
    errors: null,
    editSuccess: false, // ✅ Ajout de editSuccess
};

// pure functions
const contactReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case LOAD_CONTACTS:
            return { ...state, load: true };
        case GET_CONTACTS:
            return { ...state, load: false, listContacts: payload.listContacts };
        case GET_CONTACT:
            return { ...state, load: false, contactToGet: payload.contactToGet };
        case FAIL_CONTACTS:
            return { ...state, load: false, errors: payload };
        case "EDIT_CONTACT":
            return { ...state, editSuccess: true }; // ✅ Marquer l'édition comme réussie
        case "RESET_EDIT_SUCCESS":
            return { ...state, editSuccess: false }; // ✅ Réinitialisation après redirection
        default:
            return state;
    }
};

export default contactReducer;
