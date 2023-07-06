import Warranty from "../models/Warranty.js";
import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
} from "../errors/index.js";
import checkPermissions from "../utils/checkPermissions.js";
import mongoose from "mongoose";
import moment from "moment";

const createWarranty = async (req, res) => {
  const { ItemName } = req.body;
  if (!ItemName) {
    throw new BadRequestError("Please Provide All values");
  }

  const WarrantyId = Math.floor(Math.random() * 9000000000) + 1000000000;

  req.body.createdBy = req.user.userId;

  const warranty = await Warranty.create({ ...req.body, WarrantyId });
  res.status(StatusCodes.CREATED).json({ warranty });
};

// const getAllItems = async(req,res) =>{
//     const items = await Item.find({createdBy:req.user.userId})
//     res
//         .status(StatusCodes.OK)
//         .json({items,totalItems: items.length, numOfPages: 1})
// }

const getAllWarranties = async (req, res) => {
  const { status, sort, search } = req.query;

  const queryObject = {
    createdBy: req.user.userId,
  };
  // add stuff based on condition

  if (status && status !== "all") {
    queryObject.status = status;
  }

  if (search) {
    queryObject.WarrantyId = { $regex: search, $options: "i" };
  }
  // NO AWAIT

  let result = Warranty.find(queryObject);

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

  const warranties = await result;

  const totalWarranties = await Warranty.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalWarranties / limit);

  res.status(StatusCodes.OK).json({ warranties, totalWarranties, numOfPages });
};

const updateWarranty = async (req, res) => {
  const { id: warrantyId } = req.params;
  const { ItemName, WarrantyId } = req.body;
  if (!ItemName || !WarrantyId) {
    throw new BadRequestError("Please Provide All values");
  }

  const warranty = await Warranty.findOne({ _id: warrantyId });
  if (!warranty) {
    throw new NotFoundError(`No Item with id : ${warrantyId}`);
  } //check permission

  checkPermissions(req.user, warranty.createdBy);
  const updatedWarranty = await Warranty.findOneAndUpdate(
    { _id: warrantyId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(StatusCodes.OK).json({ updatedWarranty });
};

const deleteWarranty = async (req, res) => {
  const { id: warrantyId } = req.params;
  const warranty = await Warranty.findOne({ _id: warrantyId });
  if (!warranty) {
    throw new NotFoundError(`No Item with id : ${warrantyId}`);
  }
  checkPermissions(req.user, warranty.createdBy);

  await warranty.remove();
  res
    .status(StatusCodes.OK)
    .json({ msg: "Success! Item warranty details removed" });
};

const showWarrantyStats = async (req, res) => {
  let stats = await Warranty.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    Valid: stats.Valid || 0,
    Expired: stats.Expired || 0,
  };

  let monthlyApplications = await Warranty.aggregate([
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
  createWarranty,
  deleteWarranty,
  getAllWarranties,
  updateWarranty,
  showWarrantyStats,
};
