const employees = [
  { id: 201, name: "Amit", salary: 45000, department: "IT" },
  { id: 202, name: "Neha", salary: 60000, department: "HR" },
  { id: 203, name: "Rahul", salary: 75000, department: "IT" },
  { id: 204, name: "Pooja", salary: 30000, department: "Sales" }
];
/*  1. filter() employees from IT department
    2. map() to add:
            netSalary = salary + 10% bonus

    3. reduce() to calculate total salary payout
    4. find() employee with salary 30000
    5. findIndex() of employee "Neha"*/
let r1=employees.filter(elem=>elem.department=='IT')
console.log("The employees from IT department are",r1)
let r2=employees.map(elem=>{
    elem.netSalary=elem.salary+(0.1*elem.salary)
    return elem
})
console.log("The net salary of the Employees are",r2)
let r3=employees.reduce((acc,elem)=>acc+elem.salary,0)
console.log("Total payout salary is:",r3)
let r4=employees.find(elem=>elem.salary==30000)
console.log("Employee with salary 30000 is:",r4)
let r5=employees.findIndex(elem=>elem.name=="Neha")
console.log("Index of Neha is",r5)