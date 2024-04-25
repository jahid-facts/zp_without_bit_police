const express = require('express');
const { getImageGalleryCategory, getSingleImageGalleryCategory, updateImageGalleryCategory, deleteImageGalleryCategory, saveImageGalleryCategory } = require('../controllers/imageCategoryController');
const router = express.Router();

router.get('/image-category', getImageGalleryCategory);
router.get('/image-category/:id', getSingleImageGalleryCategory);
router.put('/update-image-category/:id', updateImageGalleryCategory) ;
router.delete('/delete-image-category/:id', deleteImageGalleryCategory);
router.post('/save-image-category', saveImageGalleryCategory);

module.exports = router;