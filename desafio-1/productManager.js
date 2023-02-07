class ProductManager {
    
    constructor(){
        this.products = []
    }

    getProducts = () => {return this.products}

    getNextId = () => {
        const count = this.products.length
        return (count > 0) ? this.products[count-1].id +1 : 1
    }

    addProduct = (title, description, price, thumbnail, stock, code) => {
        const id = this.getNextId()
        const product = {
            id,
            title,
            description,
            price,
            thumbnail,
            stock,
            code
            }
    validarProduct =() =>{
        if (title == ""){
            return true
        }
        if (description == ""){
            return true
        }
        if (price == ""){
            return true
        }
        if (thumbnail == ""){
            return true
        }
        if (stock == ""){
            return true
        }
        if (code == ""){
            return true
        }
    }
        const productList = this.getProducts()
            
        if (!productList.some((element)=> element.code === product.code)) {
            this.products.push(product)
        } else {
            console.log("is duplicated")
        }
        
    }
    getProductsById = (productsId) =>{
        const resultado = this.products.find (event => event.id == productsId)
        return resultado !== undefined ? resultado : "Not found" 
        
    }
}
const manager = new ProductManager()
console.log(manager.getProducts());
manager.addProduct("producto prueba","Este es un producto prueba",200,"Sin imagen",25,"abc123")
manager.addProduct("producto prueba","Este es un producto prueba",200,"Sin imagen",25,"abc123")
manager.addProduct("producto prueba","Este es un producto prueba",200,"Sin imagen",25,"12345")



console.log(manager.getProducts());
console.log(manager.getProductsById(1));



