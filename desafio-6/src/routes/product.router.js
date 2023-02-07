import { Router } from 'express'
import FileManager from '../manager/product.manager.js'

const fileManager = new FileManager('products.json')
const router = Router()


router.get('/', async (req, res) =>{
   const products = await fileManager.get()
    res.json({ products })
})

router.get('/:pid', async (req, res) =>{
    const id  = parseInt(req.params.pid)
    const product = await fileManager.getID(id)
     res.json({ product })
 })

router.post ('/', async (req, res) =>{
    const product = req.body
    const productAdd = await fileManager.add(product)
    
    res.json ({status: 'success', productAdd })
})

router.put ('/:pid', async (req, res) =>{
    const id = parseInt(req.params.pid)
    const productUpdate = req.body

    const products = await fileManager.getID(id)
    if(!products) return res.status(404) .send ("Product not found")

    for (const key of Object.keys(productUpdate)){
        products[key] = productUpdate[key]
    }

   await fileManager.update(id, products)
    
    res.json ({status: 'success', products })
})
router.delete('/:pid', async (req, res) => {
    const id = parseInt(req.params.pid)
    const deleteProduct =  await fileManager.deleteProduct(id)
    res.json(deleteProduct)
})

export default router