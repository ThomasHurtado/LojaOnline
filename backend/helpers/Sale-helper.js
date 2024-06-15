const Product = require('../models/Product')

async function saleItems(cartArray){

    cartItems.map(item =>{
                
        const product = await Product.findById(item.product)
        console.log(product._id)

    })
    
}
