//4.Find the smallest in marks array
let marks=[90,78,65,98]
min1=marks[0]
for(let i1=0;i1<marks.length;i1++)
    if (min1>marks[i1])
        min1=marks[i1]
console.log('Smallest in the marks array is',min1)
