import Product from '../models/Product'

export const createProducts = async (req, res) => {
    let { name, category, price, imgURL } = req.body
    let newProduct = new Product({ name, category, price, imgURL })
    let productSaved = await newProduct.save()
    res.status(201).json(productSaved)
}

export const getProducts = (req, res) => {
    res.json({ "hola": "get" })
}

export const createProductsById = (req, res) => {
    res.json({ "hola": "getById" })
}

export const updateProductsById = (req, res) => {
    res.json({ "hola": "update" })
}

export const deleteProductsById = (req, res) => {
    res.json({ "hola": "delete" })
}