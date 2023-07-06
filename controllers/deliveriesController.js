import Delivery from "../models/Delivery.js";
import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
} from "../errors/index.js";
import checkPermissions from "../utils/checkPermissions.js";
import mongoose from "mongoose";
import moment from "moment";

const createDelivery = async (req, res) => {
  const { phoneNo } = req.body;

  if (!phoneNo) {
    throw new BadRequestError("Please provide all values");
  }
  const DeliveryId = Math.floor(Math.random() * 9000000000) + 1000000000;
  req.body.createdBy = req.user.userId;

  const delivery = await Delivery.create({ ...req.body, DeliveryId });
  res.status(StatusCodes.CREATED).json({ delivery });
};

const getAllDeliveries = async (req, res) => {
  const { DeliveryStatus, sort, search } = req.query;

  const queryObject = {
    createdBy: req.user.userId,
  };
  // add stuff based on condition

  if (DeliveryStatus && DeliveryStatus !== "all") {
    queryObject.status = DeliveryStatus;
  }

  //malith - item name
  if (search) {
    queryObject.DeliveryId = { $regex: search, $options: "i" };
  }
  // NO AWAIT

  let result = Delivery.find(queryObject);

  // chain sort conditions

  if (sort === "latest") {
    result = result.sort("-createdAt");
  }
  if (sort === "oldest") {
    result = result.sort("createdAt");
  }
  if (sort === "a-z") {
    result = result.sort("DeliveryId");
  }
  if (sort === "z-a") {
    result = result.sort("-DeliveryId");
  }
  // setup pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const deliveries = await result;

  const totalDeliveries = await Delivery.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalDeliveries / limit);

  res.status(StatusCodes.OK).json({ deliveries, totalDeliveries, numOfPages });
};

const updateDelivery = async (req, res) => {
  const { id: deliveryId } = req.params;

  const { DeliveryId, RepairId } = req.body;

  if (!DeliveryId) {
    throw new BadRequestError("Please Provide All values");
  }

  const delivery = await Delivery.findOne({ _id: deliveryId });
  if (!delivery) {
    throw new NotFoundError(`No Item with id : ${deliveryId}`);
  }

  //check permission
  checkPermissions(req.user, delivery.createdBy);

  const updatedDelivery = await Delivery.findOneAndUpdate(
    { _id: deliveryId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(StatusCodes.OK).json({ updatedDelivery });
};

const deleteDelivery = async (req, res) => {
  const { id: deliveryId } = req.params;
  const delivery = await Delivery.findOne({ _id: deliveryId });
  if (!delivery) {
    throw new NotFoundError(`No Item with id : ${deliveryId}`);
  }
  checkPermissions(req.user, delivery.createdBy);

  await delivery.remove();
  res.status(StatusCodes.OK).json({ msg: "Success! Item removed" });
};

const showDeliveryStats = async (req, res) => {
  let stats = await Delivery.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: "$DeliveryStatus", count: { $sum: 1 } } },
  ]);

  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    pending: stats.pending || 0,
    preTransit: stats.preTransit || 0,
    outForDelivery: stats.outForDelivery || 0,
    delivered: stats.delivered || 0,
  };

  let monthlyApplications = await Delivery.aggregate([
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
    .map((delivery) => {
      const {
        _id: { year, month },
        count,
      } = delivery;
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
  createDelivery,
  deleteDelivery,
  getAllDeliveries,
  updateDelivery,
  showDeliveryStats,
};
