const order = {
    orderId: "ORD1001",
     customer: {
           name: "Anita",
            address: {
                city: "Hyderabad",
                pincode: 500085
            }
         },
    items: [
        { product: "Laptop", price: 70000 }
    ]
};
let cpyorder=structuredClone(order)
cpyorder.customer.address.city="AP"
cpyorder.items[0].price=1000000
console.log("Original object:",order)
console.log("Modified object using DeepCopy:",cpyorder)