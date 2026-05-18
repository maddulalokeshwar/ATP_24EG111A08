// File: week-1/day-1/Sum_of_elements_in_array_using_function.js | Description: Sum of elements in array using function
//6.write a function that recieves an array and returns the summ
function sumOfArray(a){
    let sum=0
    for(let i=0;i<a.length;i++)
        sum+=a[i]
    return sum
}
console.log("The sum of the array [90,78,65,98]:",sumOfArray([90,78,65,98]))