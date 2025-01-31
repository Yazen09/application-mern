// Importation des types d'actions
import { 
    FAIL_PRODUCTS, 
    GET_PRODUCT, 
    GET_PRODUCTS, 
    LOAD_PRODUCTS 
} from "../ActionTypes/product";

// État initial
const initialState = {
    listProducts: [],
    productToGet: {},
    load: false,
    errors: null,
};

// Fonction pure (reducer)
const productReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case LOAD_PRODUCTS:
            return { ...state, load: true };
        case GET_PRODUCTS:
            return { ...state, load: false, listProducts: payload.listProducts };
        case GET_PRODUCT:
            return { ...state, load: false, productToGet: payload.productToGet };
        case FAIL_PRODUCTS:
            return { ...state, load: false, errors: payload };
        default:
            return state;
    }
};

export default productReducer;
