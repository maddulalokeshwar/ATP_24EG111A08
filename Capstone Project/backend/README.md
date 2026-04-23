1.Generate a json package
2.Create a .env file
3.Create express app & assign the port number 
4.Connect to the db
5.Define schemas and create Models  
    -UserType Schema
        FirstName
        LastName
        email(unique)
        password
        role
        profileImageUrl
        isUserActive
6.Implemement API's
7.Create common API's for register,login and logout


Cross-Site Request Forgery



As we have planned to on;y give login option to the admin rather than giving him regestration and then login.
To achieve this we need to do data seeding i.e we need to add data manually .