const {Product} = require('./index');
const{checkAdmin}=require("../adminpage/checkadmin")

// Get all products
async function getAllProducts (req, res) {
  try {
    // include:category
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get a single product by ID
async function getProductById (req, res) {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

function createProduct(req, res){
  const isAdmin = checkAdmin(req, res);
  if(isAdmin){
    const {name, price, image, count, categoryId} = req.body;
  
    const newProduct = {
        name,
        price,
        image,
        count,
        categoryId,
    }
    Product.create(newProduct).then((product)=>{
        res.status(201).json(product)
      }).catch((err)=>{
        res.status(500).json({error: err.message})
      })
  } 
}

function updateProduct(req,res){
  const isAdmin = checkAdmin(req, res);
  if(isAdmin){
    const {name, price,count, image, categoryId, id} = req.body;
    Product.update({name, price, description, img, categoryId},{where:{id}}).then(()=>{
        res.json({response:'updated'})
    }).catch((err)=>{
        res.status(500).json({error: err.message})
    })
  }
}

function deleteProduct(req,res){
  const isAdmin = checkAdmin(req, res);
  if(isAdmin){
    const {id} = req.body;
    Product.destroy({where:{id}}).then(()=>{
        res.json({response:'deleted'})
    }).catch((err)=>{
        res.status(500).json({error: err.message})
    }) 
  
}}

module.exports = {getAllProducts,getProductById,createProduct,updateProduct,deleteProduct}