// File: week-2/day-4/shallowCopy.js | Description: shallow Copy
 const user = {
     id: 101,
     name: "Ravi",
     preferences: {
         theme: "dark",
         language: "en"
     }
 };
 const cpyUser={...user}
 cpyUser.name="lokesh"
 cpyUser.preferences.theme='thriller'
 console.log("Original user object:",user)
 console.log("Modified user object (Using shallow copy):",cpyUser)