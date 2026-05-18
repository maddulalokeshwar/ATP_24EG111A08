// File: week-1/day-2/arrayoper1.js | Description: arrayoper1
const temperatures = [32, 35, 28, 40, 38, 30, 42];
/*Tasks:
    1. filter() temperatures above 35
    2. map() to convert all temperatures from Celsius → Fahrenheit
    3. reduce() to calculate average temperature
    4. find() first temperature above 40
    5. findIndex() of temperature 28
*/
//Filter method
let r1=temperatures.filter(elem=>elem>35)
console.log("Temperatures above 35",r1)
//Map method
let r2=temperatures.map(elem=>((elem*1.8)+32))
console.log("Farenheit readings",r2)
let count=0
//Reduce method
let r3=temperatures.reduce((acc,elem)=>{
    count++
    return acc+elem
})
console.log("Average temperature",r3/count)
//Find method
let r4=temperatures.find(elem=>elem>40)
console.log('first temperature above 40',r4)
//FInd by index
let r5=temperatures.findIndex(elem=>elem==28)
console.log('Index of temperature 28 is:',r5)