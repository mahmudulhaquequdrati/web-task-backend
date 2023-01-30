const express = require("express");
const {
  addBilling,
  getBillings,
  deleteBillings,
  updateBillings,
  getAllBillings,
} = require("../controllers/billingController");
const { registerUser, loginUser } = require("../controllers/userController");
const checkLogin = require("../middleware/checkLogin");

const router = express.Router();

router.post("/registration", registerUser);
router.post("/login", loginUser);

// due to making to route as doc i am doing other functions here
router.post("/add-billing", checkLogin, addBilling);
router.get("/all-billing-list", checkLogin, getAllBillings);
router.get("/billing-list", checkLogin, getBillings);
router.delete("/delete-billing/:id", checkLogin, deleteBillings);
router.put("/update-billing/:id", checkLogin, updateBillings);

module.exports = router;
