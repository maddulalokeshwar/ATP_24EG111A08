// File: week-2/day-4/spreadOperatorObject.js | Description: spread Operator Object
let user = {
      name: "Ravi",
      city: "Hyderabad"
 };
 let updatedUser={... user}
 updatedUser.age=25;
 console.log("Original user object:",user)
 console.log("Updated uder object:",updatedUser)