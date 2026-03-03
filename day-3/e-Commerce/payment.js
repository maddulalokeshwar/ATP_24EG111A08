import { reduceStock } from './product.js';
import { getCartItems, getCartTotal, clearCart } from './cart.js';
import { applyDiscount } from './discount.js';

export function processPayment(paymentMethod, couponCode = null) {

    let cartItems = getCartItems();
    let cartTotal = getCartTotal();

    if (cartItems.length === 0)
        return "Cart is empty";

    if (!validatePaymentMethod(paymentMethod))
        return "Please select an appropriate payment method";

    let discountData = applyDiscount(cartTotal, couponCode, cartItems);
    let finalAmount = discountData.finalTotal;

    console.log(`A total of ${finalAmount} has been deducted from your account`);

    for (let item of cartItems) {
        reduceStock(item.id, item.quantity);
    }

    const orderSummary = {
        orderId: generateOrderId(),
        items: cartItems,
        subTotal: discountData.originalTotal,
        discount: discountData.discount,
        finalTotal: finalAmount,
        status: "success"
    };

    clearCart();

    return orderSummary;
}

export function validatePaymentMethod(method) {
    const validMethods = ['upi', 'card', 'cash'];
    return validMethods.includes(method);
}

function generateOrderId() {
    return 'ORD' + Date.now();
}