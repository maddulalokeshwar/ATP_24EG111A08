//5.Write a function which accepts 3 numbers as arg and return bug number
function Largest(a,b,c){
    let big=0
    if (a>b && a>c)
        big=a
    else if (a<b && c<b)
        big=b
    else if(c>a && c>b)
        big=c
    return big
}
console.log("The largest of 3 numbers is",Largest(10,20,30))