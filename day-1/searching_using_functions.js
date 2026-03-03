//7.function should reieve an arrray and target return index if found else not found
function findElem(a,target){
    for(let i=0;i<a.length;i++){
        if(a[i]==target){
            return i
        }
    }
    return 'Not Found'
}
console.log("The index of 90 in [90,78,65,98] is:",findElem([90,78,65,98],90))
console.log("The index of 10 in [90,78,65,98] is:",findElem([90,78,65,98],10))