// File: week-2/day-3/e-Commerce/cart.js | Description: cart
import { getProductById, checkStock } from './product.js';
let cartItems = [];
//Add to cart Function
export function addToCart(productId, quantity) {
    let product = getProductById(productId);
    if (!product) return "Product not found";

    if (!checkStock(productId, quantity))
        return "Not enough stock";

    let existing = cartItems.find(item => item.id == productId);

    if (existing) {
        existing.quantity += quantity;
    } else {
        cartItems.push({
            id: product.id,
            name: product.name,
            price: product.price,
            category: product.category,
            quantity: quantity
        });
    }

    return "Item added to cart successfully";
}
//Remove from Cart function
export function removeFromCart(productId) {
    let index = cartItems.findIndex(product => product.id == productId);

    if (index === -1)
        return "Item does not exist in the cart";

    cartItems.splice(index, 1);
    return "Item successfully removed from the cart";
}
//Update Quantity function
export function updateQuantity(productId, newQuantity) {
    let item = cartItems.find(product => product.id == productId);

    if (!item)
        return "Item does not exist in the cart";

    if (!checkStock(productId, newQuantity))
        return "Not enough stock";

    item.quantity = newQuantity;
    return "Quantity updated successfully";
}
//Cart items function
export function getCartItems() {
    return cartItems;
}
//Get cart total function
export function getCartTotal() {
    return cartItems.reduce((total, item) =>
        total + (item.quantity * item.price), 0
    );
}
//Clear cart function
export function clearCart() {
    cartItems = [];
}