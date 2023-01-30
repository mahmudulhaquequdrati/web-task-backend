const Billing = require("../models/Billing");

const addBilling = async (req, res) => {
  try {
    const { name, email, phone, payable } = req.body;
    const billing = new Billing({
      name,
      email,
      phone,
      payable,
    });
    const data = await billing.save();
    res.status(201).json({
      message: "Billing added successfully",
      data: data,
    });
  } catch (error) {
    res.status(503).json({
      error: "server error occurred",
      err,
    });
  }
};

const getBillings = async (req, res) => {
  // also add pagination here
  try {
    // pagination
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const skipIndex = (page - 1) * limit;
    const total = await Billing.countDocuments();
    const billings = await Billing.find().limit(limit).skip(skipIndex).exec();
    res.status(200).json({
      message: "Billings fetched successfully",
      data: billings,
      total,
      status: 200,
    });
  } catch (error) {
    res.status(503).json({
      error: "server error occurred",
      err,
    });
  }
};

const getAllBillings = async (req, res) => {
  try {
    const total = await Billing.find();
    res.status(200).json({
      message: "All Billings fetched successfully",
      data: total,
      status: 200,
    });
  } catch (error) {
    res.status(503).json({
      error: "server error occurred",
      err,
    });
  }
};

const deleteBillings = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Billing.findByIdAndDelete(id);
    res.status(200).json({
      message: "Billing deleted successfully",
      data: data,
    });
  } catch (error) {
    res.status(503).json({
      error: "server error occurred",
      err,
    });
  }
};

const updateBillings = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, payable } = req.body;
    const data = await Billing.findByIdAndUpdate(
      id,
      {
        name,
        email,
        phone,
        payable,
      },
      { new: true }
    );
    res.status(200).json({
      message: "Billing updated successfully",
      data: data,
    });
  } catch (error) {
    res.status(503).json({
      error: "server error occurred",
      err,
    });
  }
};

module.exports = {
  addBilling,
  getBillings,
  deleteBillings,
  updateBillings,
  getAllBillings,
};
