const fs = require ("fs")

class ProductManager {
    
    constructor(path){
        this.path = path
        this.format = "utf-8"
    }
    //ESCRIBE EL FS
    writeFile = async data => {
        try {
            await fs.promises.writeFile(
            this.path, JSON.stringify(data, null, 2)
            )
        }catch(err) {
            console.log(err);
        }
    }
    //TRAE PRODUCTO 
    getProducts = async () => {
        return fs.promises.readFile(this.path, this.format)
        .then(content => JSON.parse(content) || [])
        .catch(e => {
            console.log('ERROR', e);
            return []
        })
    }
    
    //AGREGA PRODUCTO
    addProduct = async (title, description, price, thumbnail, stock, code) => {
        try {
            const products = await fs.promises.readFile(this.path, this.format);
            const data = JSON.parse(products);
            let newId
            data.length === 0 ? newId = 1 : newId = data[data.length - 1].id + 1;
            const newObj = {id: newId,title, description, price, thumbnail, stock, code};
            data.push(newObj);
            await this.writeFile(data)
            return newObj.id;
          }catch(err) {
            console.log(err);
          }
        }
        //TRAE POR ID 
        getById = async id => {
            try {
              const readProducts = await fs.promises.readFile(this.path, 'utf-8');
              const data = JSON.parse(readProducts);
              const obj = data.find(obj => obj.id === id);
              return obj ? obj : null;
        
            }catch(err) {
              console.log(err);
            }
          }
          //ELIMINA ID
          async deleteProduct (idDelete){
            const pdelete = await this.getProducts();
            if (pdelete[idDelete-1] === undefined){
                console.log(" No se borro nada ");
            }else {
                const newProduct = {}
                pdelete.splice(idDelete-1, 1); 
                pdelete.push(newProduct)
            }
          }
          //update de producto

          updateProduct = async (id, obj) => {
            obj.id == id
            const readProducts = await fs.promises.readFile(this.path, 'utf-8');
              const data = JSON.parse(readProducts);
              const idx = data.findIndex(e => e.id === id);
              if(idx < 1)
              await this.writeFile(data)
        }
           
    }

    

    
   
    async function run() {
        const manager = new ProductManager('product.json')
        //trae el producto
      //console.log( await manager.getProducts() );
        //crea el producto
        //await manager.addProduct("prueba","producto",23,"sin imagen",24, "123w")
        //onsole.log( await manager.getProducts() );
        //trae por id que no hay
        // console.log( await manager.getById(2) )
        //trae por id que si hay
        //console.log( await manager.getById(1) )
        //elimina el id 
        //console.log( await manager.deleteById(1) )
        //modifica el producto
        await manager.updateProduct(1,{
          title: "auricular",
          description: "inalambrico",
          price: 2300,
          thumbnail: "sin imagen",
          stock: 24,
          code: "123w"
        })
        console.log( await manager.getProducts() );
    }
    
    run()