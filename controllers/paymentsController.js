import Payment from "../models/Payment.js";
import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
} from "../errors/index.js";
import checkPermissions from "../utils/checkPermissions.js";
import mongoose from "mongoose";
import moment from "moment";

const createPayment = async (req, res) => {
  const { PaymentMethod } = req.body;
  if (!PaymentMethod) {
    throw new BadRequestError("Please Provide All values");
  }
  const PaymentId = Math.floor(Math.random() * 9000000000) + 1000000000;

  req.body.createdBy = req.user.userId;
  const payment = await Payment.create({ ...req.body, PaymentId });
  res.status(StatusCodes.CREATED).json({ payment });
};

const getPayments = async (req, res) => {
  const { PaymentMethod, sort, search } = req.query;

  const queryObject = {
    createdBy: req.user.userId,
  };
  // add stuff based on condition

  if (PaymentMethod && PaymentMethod !== "all") {
    queryObject.PaymentMethod = PaymentMethod;
  }

  if (search) {
    queryObject.ItemName = { $regex: search, $options: "i" };
  }
  // NO AWAIT

  let result = Payment.find(queryObject);

  // chain sort conditions

  if (sort === "latest") {
    result = result.sort("-createdAt");
  }
  if (sort === "oldest") {
    result = result.sort("createdAt");
  }
  if (sort === "a-z") {
    result = result.sort("ItemName");
  }
  if (sort === "z-a") {
    result = result.sort("-ItemName");
  }
  // setup pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const payments = await result;

  const totalPayments = await Payment.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalPayments / limit);

  res.status(StatusCodes.OK).json({ payments, totalPayments, numOfPages });
};

const updatePayment = async (req, res) => {
  const { id: paymentId } = req.params;
  const { PaymentId } = req.body;
  if ( !PaymentId) {
    throw new BadRequestError("Please Provide All values");
  }

  const payment = await Payment.findOne({ _id: paymentId });
  if (!payment) {
    throw new NotFoundError(`No Item with id : ${paymentId}`);
  } //check permission

  checkPermissions(req.user, payment.createdBy);
  const updatedPayment = await Payment.findOneAndUpdate(
    { _id: paymentId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(StatusCodes.OK).json({ updatedPayment });
};

const deletePayment = async (req, res) => {
  const { id: paymentId } = req.params;
  const payment = await Payment.findOne({ _id: paymentId });
  if (!payment) {
    throw new NotFoundError(`No Item with id : ${paymentId}`);
  }
  checkPermissions(req.user, payment.createdBy);

  await payment.remove();
  res.status(StatusCodes.OK).json({ msg: "Success! Payment removed" });
};

const showPaymentStats = async (req, res) => {
  let stats = await Payment.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: "$PaymentMethod", count: { $sum: 1 } } },
  ]);
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    Cash: stats.Cash || 0,
    Card: stats.Card || 0,
  };

  let monthlyApplications = await Payment.aggregate([
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
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
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
  createPayment,
  deletePayment,
  getPayments,
  updatePayment,
  showPaymentStats,
};
