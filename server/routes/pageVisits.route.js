const express = require("express");
const {
  getVisitStatistics,
} = require("../controllers/pageVisitsController");
const router = express.Router();

router.get("/visit/:path", getVisitStatistics);

module.exports = router;
