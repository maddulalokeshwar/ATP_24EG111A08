const cart = [
  { id: 101, name: "Laptop", price: 60000, quantity: 1, inStock: true },
  { id: 102, name: "Mouse", price: 800, quantity: 2, inStock: true },
  { id: 103, name: "Keyboard", price: 1500, quantity: 1, inStock: false },
  { id: 104, name: "Monitor", price: 12000, quantity: 1, inStock: true }
];
/*Tasks:
    1. Use filter() to get only inStock products
    2. Use map() to create a new array with:  { name, totalPrice }
    3. Use reduce() to calculate grand total cart value
    4. Use find() to get details of "Mouse"
    5. Use findIndex() to find the position of "Keyboard"*/
let r1=cart.filter(elem=>elem.inStock==true)
console.log("The products that are in stock are:",r1)
let r2=cart.map(function(elem){
    let name1=elem.name
    let price1=elem.price
    return {name1,price1}
})
console.log("The new array of objects with name and totalPrice are:",r2)
let r3=cart.reduce((acc,elem)=>acc+(elem.quantity*elem.price),0)
console.log("Total cart value is ",r3)
let r4=cart.find(elem=>elem.name=='Mouse')
console.log("Details of Mouse is:",r4)
let r5=cart.findIndex(elem=>elem.name=='Keyboard')
console.log("Index of the product keyboard is:",r5)