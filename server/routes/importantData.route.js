const express = require('express');
const { getImportantData,saveImportantData,getSingleImportantData,updateImportantData,deleteImportantData } = require('../controllers/importantDataController');
const router = express.Router();

router.get('/important-data', getImportantData);
router.get('/important-data/:id', getSingleImportantData);
router.put('/update-important-data/:id', updateImportantData);
router.delete('/delete-important-data/:id', deleteImportantData);
router.post('/save-important-data', saveImportantData);

module.exports = router;