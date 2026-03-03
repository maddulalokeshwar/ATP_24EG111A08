const coupons = {
    WELCOME10: { type: 'percentage', value: 10, minAmount: 1000 },
    FLAT500: { type: 'flat', value: 500, minAmount: 5000 },
    ELECTRONICS20: {
        type: 'percentage',
        value: 20,
        minAmount: 10000,
        category: 'electronics'
    }
};

export function validateCoupon(code, total, items) {
    const coupon = coupons[code];

    if (!coupon)
        return { valid: false, message: 'Invalid coupon' };

    if (total < coupon.minAmount)
        return { valid: false, message: 'Minimum amount not met' };

    if (coupon.category &&
        !items.some(item => item.category === coupon.category)) {
        return { valid: false, message: 'Category not available' };
    }

    return { valid: true, message: 'Coupon applied' };
}

export function calculateDiscount(code, total) {
    const coupon = coupons[code];
    if (!coupon) return 0;

    if (coupon.type === 'percentage')
        return (total * coupon.value) / 100;

    return coupon.value;
}

export function applyDiscount(total, code, items) {

    if (!code)
        return {
            originalTotal: total,
            discount: 0,
            finalTotal: total,
            message: "No coupon applied"
        };

    const check = validateCoupon(code, total, items);

    if (!check.valid) {
        return {
            originalTotal: total,
            discount: 0,
            finalTotal: total,
            message: check.message
        };
    }

    const discount = calculateDiscount(code, total);

    return {
        originalTotal: total,
        discount: discount,
        finalTotal: total - discount,
        message: 'Discount applied'
    };
}