import Supplier from "../models/Supplier.js";
import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
} from "../errors/index.js";
import checkPermissions from "../utils/checkPermissions.js";
import mongoose from "mongoose";
import moment from "moment";

const createSupplier = async (req, res) => {
  const { supplierName } = req.body;
  if (!supplierName) {
    throw new BadRequestError("Please Provide All values");
  }
  const SupplierId = Math.floor(Math.random() * 9000000000) + 1000000000;

  req.body.createdBy = req.user.userId;

  const supplier = await Supplier.create({ ...req.body, SupplierId });
  res.status(StatusCodes.CREATED).json({ supplier });
};

const getAllSuppliers = async (req, res) => {
  const { SupplierType, sort, search } = req.query;

  const queryObject = {
    createdBy: req.user.userId,
  };
  // add stuff based on condition

  if (SupplierType && SupplierType !== "all") {
    queryObject.status = SupplierType;
  }
  // if (itemSupplier && itemSupplier !== 'all') {
  //   queryObject.itemSupplier = itemSupplier;
  //}
  if (search) {
    queryObject.supplierName = { $regex: search, $options: "i" };
  }
  // NO AWAIT

  let result = Supplier.find(queryObject);

  // chain sort conditions

  if (sort === "latest") {
    result = result.sort("-createdAt");
  }
  if (sort === "oldest") {
    result = result.sort("createdAt");
  }
  if (sort === "a-z") {
    result = result.sort("supplierName");
  }
  if (sort === "z-a") {
    result = result.sort("-supplierName");
  }
  // setup pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const suppliers = await result;

  const totalSuppliers = await Supplier.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalSuppliers / limit);

  res.status(StatusCodes.OK).json({ suppliers, totalSuppliers, numOfPages });
};

const updateSupplier = async (req, res) => {
  const { id: supplierId } = req.params;
  const { SupplierId, supplierName } = req.body;
  if (!SupplierId || !supplierName) {
    throw new BadRequestError("Please Provide All values");
  }

  const supplier = await Supplier.findOne({ _id: supplierId });
  if (!supplier) {
    throw new NotFoundError(`No Supplier with id : ${supplierId}`);
  } //check permission

  checkPermissions(req.user, supplier.createdBy);
  const updatedSupplier = await Supplier.findOneAndUpdate(
    { _id: supplierId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(StatusCodes.OK).json({ updatedSupplier });
};

const deleteSupplier = async (req, res) => {
  const { id: supplierId } = req.params;
  const supplier = await Supplier.findOne({ _id: supplierId });
  if (!supplier) {
    throw new NotFoundError(`No Supplier with id : ${supplierId}`);
  }
  checkPermissions(req.user, supplier.createdBy);

  await supplier.remove();
  res.status(StatusCodes.OK).json({ msg: "Success! Supplier removed" });
};

const showSupplierStats = async (req, res) => {
  let stats = await Supplier.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: "$SupplierType", count: { $sum: 1 } } },
  ]);
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    creditSupplier: stats.creditSupplier || 0,
    cashSupplier: stats.cashSupplier || 0,
  };

  let monthlyApplications = await Supplier.aggregate([
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
  createSupplier,
  deleteSupplier,
  getAllSuppliers,
  updateSupplier,
  showSupplierStats,
};
