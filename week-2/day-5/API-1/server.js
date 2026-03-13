import exp from 'express'
const app = exp()
import {userApp} from "./userAPI.js"
import { productApp } from "./productAPI.js"
//Use body parse middleware
app.use(exp.json())

function middleware1(req,res,next){
  //forwarding req to next
  console.log("Middleware1 is executed")
  next()
}

function middleware2(req,res,next){
  //forwarding req to next
  console.log("Middleware2 is executed")
  next()
}

app.use(middleware1)
app.use(middleware2)
//Forwarding the req to the userAPI
app.use('/user-api', userApp)
app.use('/product-api', productApp)

const port = 3000
app.listen(port, () =>
  console.log(`server listening to port ${port}...`)
)
