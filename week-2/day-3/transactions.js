const transactions = [
  { id: 1, type: "credit", amount: 5000 },
  { id: 2, type: "debit", amount: 2000 },
  { id: 3, type: "credit", amount: 10000 },
  { id: 4, type: "debit", amount: 3000 }
];

/* Tasks:
    1. filter() all credit transactions
    2. map() to extract only transaction amounts
    3. reduce() to calculate final account balance
    4. find() the first debit transaction
    5. findIndex() of transaction with amount 10000*/

let r1=transactions.filter(elem=>elem.type=='credit')
console.log("All credit transactions are:",r1)
let r2=transactions.map(elem=>elem.amount)
console.log("The transactions amounts are:",r2)
let r3=transactions.reduce((acc,elem)=>{
    if(elem.type=='credit')
        acc+=elem.amount
    else if(elem.type=='debit')
        acc-=elem.amount
    return acc
},0)
console.log("Final account balance is",r3)
let r4=transactions.find(elem=>elem.type=='debit')
console.log("Details of first debit transaction is",r4)
let r5=transactions.findIndex(elem=>elem.amount==10000)
console.log("Index of the transaction with transaction amount 10000 is:",r5)
