const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const productController = require('../controllers/productController');

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, path.join(__dirname, '../images/'));
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  },
});

router.post('/', multer({ storage: storage }).single("image"), productController.addProduct);
router.get('/:productId', productController.getProductById);
router.get('/', productController.getProducts);
router.put('/:productId', productController.updateProduct);
router.delete('/:productId', productController.deleteProduct);

module.exports = router;
