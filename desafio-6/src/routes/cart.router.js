import { Router } from 'express'
import CartManager from '../manager/cart.manager.js'

const cartManager = new CartManager('carts.json')
const router = Router()


router.get('/', async (req, res) =>{
   const carts = await cartManager.get()
    res.json({ carts })
})

router.get('/:cid', async (req, res) =>{
    const id  = parseInt(req.params.cid)
    const cart = await cartManager.getID(id)
     res.json({ cart })
 })

router.post ('/', async (req, res) =>{
    const cartNew = await cartManager.create()
    
    res.json ({status: 'success', cartNew })
})

router.post ('/:cid/product/:pid', async (req, res) =>{
    const cartID = parseInt(req.params.cid)
    const productID = parseInt(req.params.pid)

    

    const cart = await cartManager.addProduct(cartID, productID)
    

    
    
    res.json ({status: 'success', cart })
})

export default router