import exp from 'express'
const app = exp()

app.use(exp.json())

const port = 3000
app.listen(port, () =>
  console.log(`server listening to port ${port}...`)
)

/* ================= USERS (UNCHANGED) ================= */

let users = []

app.get('/users', (req, res) => {
  res.json({ message: "all users", payload: users })
})

app.post('/users', (req, res) => {
  const newUser = req.body
  users.push(newUser)
  res.json({ message: "User created" })
})

app.put('/users', (req, res) => {
  let modUser = req.body
  let index = users.findIndex(userObj => userObj.id === modUser.id)

  if (index == -1)
    return res.json({ message: "User not found" })

  users.splice(index, 1, modUser)
  res.json({ message: "User updated successfully" })
})

app.delete('/users/:id', (req, res) => {
  let iDOfUrl = Number(req.params.id)
  let index = users.findIndex(userObj => userObj.id === iDOfUrl)

  if (index === -1)
    return res.json({ message: "Sorry,user not found" })

  users.splice(index, 1)
  res.json({ message: "User is deleted successfully" })
})

app.get('/users/:id', (req, res) => {
  let iDOfUrl = Number(req.params.id)
  let index = users.findIndex(userObj => userObj.id === iDOfUrl)

  if (index === -1)
    return res.json({ message: "Sorry,user not found" })

  res.json({ message: "User data:", payload: users[index] })
})

/* ================= PRODUCTS (FIXED ONLY) ================= */

let products = []

// Read all products
app.get('/product', (req, res) => {
  res.json({ message: "The available products are:", payload: products })
})

// Read products by brand
app.get('/product/:brand', (req, res) => {
  let reqBrand = req.params.brand

  let selectedProducts = products.filter(p => p.brand === reqBrand)

  if (selectedProducts.length === 0)
    return res.json({ message: "No products found with the brand name" })

  res.json({
    message: "The products with the brand name are",
    payload: selectedProducts
  })
})

// Create product
app.post('/product', (req, res) => {
  const newProduct = req.body
  products.push(newProduct)
  res.json({ message: "The product is created successfully" })
})

// Update product (UNCHANGED URL: PUT /product)
app.put('/product', (req, res) => {
  let updateObj = req.body

  let index = products.findIndex(
    p => p.productId === updateObj.productId
  )

  if (index === -1)
    return res.json({ message: "Product not found" })

  products.splice(index, 1, updateObj)

  res.json({
    message: "The product is updated successfully",
    payload: products[index]
  })
})

// Delete product
app.delete('/product/:productId', (req, res) => {
  let reqId = Number(req.params.productId)

  let index = products.findIndex(
    p => p.productId === reqId
  )

  if (index === -1)
    return res.json({ message: "Sorry, The product is not found" })

  products.splice(index, 1)

  res.json({ message: "The product is deleted" })
})