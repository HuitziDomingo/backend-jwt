import Product from '../models/Product'

export const createProducts = async (req, res) => {
    let { name, category, price, imgURL } = req.body
    let newProduct = new Product({ name, category, price, imgURL })
    let productSaved = await newProduct.save()
    res.status(201).json(productSaved)
}

export const getProducts = async (req, res) => {
    let products = await Product.find()
    res.json(products)
}

export const getProductsById = async (req, res) => {
    let product = await Product.findById(req.params.productId)
    res.status(200).json(product)
}

export const updateProductsById = async (req, res) => {
    let updatedProduct = await Product.findByIdAndUpdate(req.params.productId, req.body, {
        new: true
    })
    res.status(200).json(updatedProduct)
}

export const deleteProductsById = async (req, res) => {
    await Product.findByIdAndDelete(req.params.productId)
    res.status(204)
}

