import mongoose from "mongoose";

const productCollection = 'products'

const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    code: String,
    price: Number,
    category: String,
    thumbnail: Array
})

const productsModel = mongoose.model(productCollection,productSchema)

export default productsModel