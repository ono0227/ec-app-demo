export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const deleteproductsAction = (products) => {
    return {
        type: "DELETE_PRODUCT",
        payload: products
    }
}

export const FETCH_PRODUCTS = "FETCH_PRODUCTS";
export const fetchproductsAction = (products) => {
    return {
        type: "FETCH_PRODUCTS",
        payload: products
    }
}
