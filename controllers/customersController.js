import Customer from "../models/Customer.js";
import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
} from "../errors/index.js";
import checkPermissions from "../utils/checkPermissions.js";
import mongoose from "mongoose";
import moment from "moment";

const createCustomer = async (req, res) => {
  const { FirstName } = req.body;

  if (!FirstName) {
    throw new BadRequestError("Please Provide All values");
  }
  const CustomerId = Math.floor(Math.random() * 9000000000) + 1000000000;

  req.body.createdBy = req.user.userId;

  const customer = await Customer.create({ ...req.body, CustomerId });
  res.status(StatusCodes.CREATED).json({ customer });
};

const getAllCustomers = async (req, res) => {
  const { CustomerType, sort, search } = req.query;

  const queryObject = {
    createdBy: req.user.userId,
  };
  // add stuff based on condition

  if (CustomerType && CustomerType !== "all") {
    queryObject.CustomerType = CustomerType;
  }

  if (search) {
    queryObject.FirstName = { $regex: search, $options: "i" };
  }
  // NO AWAIT

  let result = Customer.find(queryObject);

  // chain sort conditions

  if (sort === "latest") {
    result = result.sort("-createdAt");
  }
  if (sort === "oldest") {
    result = result.sort("createdAt");
  }
  if (sort === "a-z") {
    result = result.sort("FirstName");
  }
  if (sort === "z-a") {
    result = result.sort("-FirstName");
  }
  // setup pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const customers = await result;

  const totalCustomers = await Customer.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalCustomers / limit);

  res.status(StatusCodes.OK).json({ customers, totalCustomers, numOfPages });
};

const updateCustomer = async (req, res) => {
  const { id: customerId } = req.params;
  const { FirstName } = req.body;
  if (!FirstName) {
    throw new BadRequestError("Please Provide All values");
  }

  const customer = await Customer.findOne({ _id: customerId });
  if (!customer) {
    throw new NotFoundError(`No Customer with id : ${customerId}`);
  }

  //check permission
  checkPermissions(req.user, customer.createdBy);
  const updatedCustomer = await Customer.findOneAndUpdate(
    { _id: customerId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(StatusCodes.OK).json({ updatedCustomer });
};

const deleteCustomer = async (req, res) => {
  const { id: customerId } = req.params;
  const customer = await Customer.findOne({ _id: customerId });
  if (!customer) {
    throw new NotFoundError(`No Customer with id : ${customerId}`);
  }
  checkPermissions(req.user, customer.createdBy);

  await customer.remove();
  res.status(StatusCodes.OK).json({ msg: "Success! Customer removed" });
};

const showCustomerStats = async (req, res) => {
  let stats = await Customer.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: "$CustomerType", count: { $sum: 1 } } },
  ]);
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    normalCustomer: stats.normalCustomer || 0,
    loyaltyCustomer: stats.loyaltyCustomer || 0,
  };

  let monthlyApplications = await Customer.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 6 },
  ]);
  monthlyApplications = monthlyApplications
    .map((customer) => {
      const {
        _id: { year, month },
        count,
      } = customer;
      const date = moment()
        .month(month - 1)
        .year(year)
        .format("MMM Y");
      return { date, count };
    })
    .reverse();

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};

export {
  createCustomer,
  deleteCustomer,
  getAllCustomers,
  updateCustomer,
  showCustomerStats,
};
