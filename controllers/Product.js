const Product = require("../Model/Product");
const cloudinary = require("../middlewares/cloudinary");


// Ajouter un produit
exports.addProduct = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);

    const newProduct = new Product({
      id_user: req.user.id,
      date: req.body.date,
      numserie: req.body.numserie,
      reference: req.body.reference,
      categorie: req.body.categorie,
      product_img: result.secure_url,
      cloudinary_id: result.public_id,
    });

    await newProduct.save();
    res.status(201).json({ message: "Produit ajouté avec succès", product: newProduct });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'ajout du produit", error });
  }
};

// Récupérer tous les produits
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des produits", error });
  }
};

// Modifier un produit
exports.updateProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Produit non trouvé" });
    }

    if (req.file) {
      await cloudinary.uploader.destroy(product.cloudinary_id);
      const result = await cloudinary.uploader.upload(req.file.path);
      req.body.product_img = result.secure_url;
      req.body.cloudinary_id = result.public_id;
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: "Produit mis à jour", product });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour du produit", error });
  }
};

// Supprimer un produit
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Produit non trouvé" });
    }

    await cloudinary.uploader.destroy(product.cloudinary_id);

    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Produit supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression du produit", error });
  }
};

// Récupérer un produit spécifique
exports.getOneProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Produit non trouvé" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération du produit", error });
  }
};


