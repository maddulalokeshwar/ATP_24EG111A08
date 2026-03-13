import exp from 'express';
import { productModel } from '../models/ProductModel.js'
import {verifyToken} from '../middlewares/verifyToken.js'
//Create a mini router
export const productApp = exp.Router()
//Create a product
productApp.post('/product',verifyToken, async (req, res) => {
    const newProduct = req.body
    const newProductDocument = new productModel(newProduct)
    await newProductDocument.save()
    res.status(201).json({ message: "Product is created successfully" })
})

//Read all products
productApp.get('/product',verifyToken,async (req, res) => {
    let productList = await productModel.find()

    res.status(200).json({
        message: "Products list",
        payload: productList
    })
})


//Read product by productId
productApp.get('/product/:productId',verifyToken,async (req, res) => {
    //Get the product iD
    const prodId = req.params.productId
    //Find the document using the id
    const productObj = await productModel.findOne({ productId: prodId })
    //Send res
    if (productObj === null)
        res.status(404).json({ message: "Product not found" })
    else
        res.status(200).json({ message: "Product found", payload: productObj})
})


//Update product by productId
productApp.put('/product/:productId',verifyToken, async (req, res) => {
    //Get the id of the product 
    const prodId = req.params.productId
    const modifiedProduct = req.body
    //Find the product and update
    const updatedProduct = await productModel.findOneAndUpdate({ productId: prodId },{ $set: modifiedProduct },{ new: true })
    //send res
    if (updatedProduct === null)
        res.status(404).json({ message: "Product not found" })
    else
        res.status(200).json({message: "Product updated successfully",payload: updatedProduct})
})


//Delete product by productId
productApp.delete('/product/:productId',verifyToken,async (req, res) => {
    //Get the product Id
    const prodId = req.params.productId
    //Get the product using iD
    const deletedProduct = await productModel.findOneAndDelete({
        productId: prodId
    })
    //Send res
    if (deletedProduct === null) 
        res.status(404).json({ message: "Product not found" })
    else 
        res.status(200).json({message: "Product deleted successfully",payload: deletedProduct})
})