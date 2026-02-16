import { getAllProducts,insertProduct,findProductById,updateQuantity,deleteProduct} from "../Models/productModel.js";
 

export const viewProducts = async (req, res) => {
    try {
        const products = await getAllProducts();
        return res.status(200).json({products});
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const createProduct = async (req, res) => {
  try {
    const { name, price, quantity } = req.body;
    const image = req.file ? req.file.filename : null;

    const result = await insertProduct(name, price, quantity, image);

    return res.status(201).json({ message: 'Product created successfully', productId: result.insertId });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

 export const buyProduct = async (req, res) => {
    try {               
        const { id, quantity } = req.body;
        const product = await findProductById(id);
        console.log(product)
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        if (product[0].quantity < quantity) {
            return res.status(400).json({ message: 'Insufficient product quantity' });
        }
        await updateQuantity(id, product[0].quantity - quantity);
        return res.status(200).json({ message: 'Product purchased successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const deleteProductbyId = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await deleteProduct(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({ message: "Product deleted successfully" });

  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};



