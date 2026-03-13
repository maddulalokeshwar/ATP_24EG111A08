//Create mini express modules(Sepreate route)
import exp from'express'
export const productApp=exp.Router()

let products = []

// Read all products
productApp.get('/product', (req, res) => {
  res.json({ message: "The available products are:", payload: products })
})

// Read products by brand
productApp.get('/product/:brand', (req, res) => {
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
productApp.post('/product', (req, res) => {
  const newProduct = req.body
  products.push(newProduct)
  res.json({ message: "The product is created successfully" })
})

// Update product
productApp.put('/product', (req, res) => {
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
productApp.delete('/product/:productId', (req, res) => {
  let reqId = Number(req.params.productId)

  let index = products.findIndex(
    p => p.productId === reqId
  )

  if (index === -1)
    return res.json({ message: "Sorry, The product is not found" })

  products.splice(index, 1)

  res.json({ message: "The product is deleted" })
})