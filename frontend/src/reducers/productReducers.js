import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL } from "../constants/productConstants";

const initialProductsStates = {
    loading: false,
    products: [],
    error: ''
}
function productListReducer(state= initialProductsStates, action) {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return {...initialProductsStates, loading: true}
        case PRODUCT_LIST_SUCCESS:
            return {...initialProductsStates, loading:false, products: action.payload}
        case PRODUCT_LIST_FAIL:
            return {...initialProductsStates, loading:false, error: action.payload}
        default:
            return state;
    }
}


const initialProductDetailsStates = {
    loading: false,
    product: {},
    error: ''
}
function productDetailsReducer(state= initialProductDetailsStates, action) {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return {...initialProductDetailsStates, loading:true}
        case PRODUCT_DETAILS_SUCCESS:
            return {...initialProductDetailsStates, loading:false, product: action.payload}
        case PRODUCT_DETAILS_FAIL:
            return {...initialProductDetailsStates, loading:false, error: action.payload}
        default:
            return state;
    }
}

export  {productListReducer,productDetailsReducer};