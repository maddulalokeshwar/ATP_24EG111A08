const marks = [78, 92, 35, 88, 40, 67];
/* 
Tasks:
    1. filter() marks ≥ 40 (pass marks)
    2. map() to add 5 grace marks to each student
    3. reduce() to find highest mark
    4. find() first mark below 40
    5. findIndex() of mark 92
*/
let r1=marks.filter(mark=>mark>=40)
console.log("Students who scored more than or equal to 40 are:",r1)

let r2=marks.map(mark=>mark+5)
console.log("The updated marks after adding the grace marks are:",r2)

let r3=marks.reduce((max,marks)=>{
    if(max<marks)
        max=marks
    return max
})
console.log("The highest mark among the students are:",r3)

let r4=marks.findLast(mark=>mark<40)
console.log("The first mark below 40 is:",r4)

let r5=marks.findIndex(mark=>mark==92)
console.log("The index of the mark 92 is",r5)