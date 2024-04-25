const express = require('express');
const { getImportantHeading,saveImportantHeading,getSingleImportantHeading,updateImportantHeading,deleteImportantHeading } = require('../controllers/importantHeadingController');
const router = express.Router();

router.get('/important-heading', getImportantHeading);
router.get('/important-heading/:id', getSingleImportantHeading);
router.put('/update-important-heading/:id', updateImportantHeading);
router.delete('/delete-important-heading/:id', deleteImportantHeading);
router.post('/save-important-heading', saveImportantHeading);

module.exports = router;