const express = require("express");
const router = express.Router();
const { 
  addProduct, 
  deleteProduct, 
  getAllProducts, 
  getOneProduct, 
  updateProduct 
} = require("../controllers/Product");
const upload = require("../middlewares/multer");

router.post('/addProduct', upload.single("image"), (req, res, next) => {
  if (!req.file) {
    return res.status(400).send({ msg: "Aucun fichier fourni" });
  }
  next();
}, addProduct);

// Récupérer tous les produits
router.get("/allproducts", getAllProducts); 

// Récupérer un produit spécifique
router.get('/product/:id', getOneProduct);

// Modifier un produit
router.put('/product/:id', upload.single("image"), updateProduct);

// Supprimer un produit
router.delete('/product/:id', deleteProduct);

module.exports = router;
