    import express from 'express';
    import { viewProducts,createProduct,buyProduct,deleteProductbyId} from '../Controllers/productController.js';
    import {protect , adminOnly} from '../Middlewares/auth.js';

import upload from "../Middlewares/uploads.js";


    const router = express.Router();

    router.get('/', viewProducts);
    router.post("/add", protect, adminOnly, upload.single("image"), createProduct);
    router.post('/buy', protect, buyProduct);
    router.delete('/:id',protect,adminOnly,deleteProductbyId);
    export default router;