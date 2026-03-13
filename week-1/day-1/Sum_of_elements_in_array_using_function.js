//6.write a function that recieves an array and returns the summ
function sumOfArray(a){
    let sum=0
    for(let i=0;i<a.length;i++)
        sum+=a[i]
    return sum
}
console.log("The sum of the array [90,78,65,98]:",sumOfArray([90,78,65,98]))