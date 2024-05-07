import express from "express";

import {
  getTransactions,
  getStatistics,
  getBarChartData,
  getPieCharData,
  getCombinedData,
} from "../controllers/transactionController.js";

const router = express.Router();
// get api to get transaction data by month
router.get("/transactions", getTransactions);

// get api for statistics by month
router.get("/statistics", getStatistics);

// get api to create an API for bar chart
router.get("/bar-chart", getBarChartData);

// get api for pie chart, find unique categories and number of items from that category for the selected month regardless of the year
router.get("/pie-chart", getPieCharData);

// get api to fetche the data from all the 3 APIs mentioned above, combines the response and sends a final response of the combined JSON
router.get("/combined-data", getCombinedData);

export default router;
