const students = [
  { id: 1, name: "Ravi", marks: 78 },
  { id: 2, name: "Anjali", marks: 92 },
  { id: 3, name: "Kiran", marks: 35 },
  { id: 4, name: "Sneha", marks: 88 },
  { id: 5, name: "Arjun", marks: 40 }
];
/*    1. filter() students who passed (marks ≥ 40)
    2. map() to add a grade field
              ≥90 → A
              ≥75 → B
              ≥60 → C
              else → D

   3. reduce() to calculate average marks
   4. find() the student who scored 92
   5. findIndex() of student "Kiran"*/

let r1=students.filter(elem=>elem.marks>=40)
console.log("The students who have passed the exam are:",r1)
let r2=students.map((elem)=>{
    if(elem.marks>=90)
        elem.grade='A'
    else if(elem.marks>=75)
        elem.grade='B'
    else if(elem.marks>=60)
        elem.grade='c'
    else
        elem.grade='D'

    return elem
})
console.log("Updated list with the property grades:",r2)

let r3=students.reduce((acc,elem)=>acc+elem.marks,0)
console.log("Average marks",r3)
let r4=students.find(elem=>elem.marks==92)
console.log("Student who scored 92 is:",r4)
let r5=students.findIndex(elem=>elem.name=='Kiran')
console.log('Index of Kiran is',r5)