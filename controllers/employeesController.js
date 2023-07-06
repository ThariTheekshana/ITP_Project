import Employee from "../models/Employee.js";
import StatusCodes from "http-status-codes";
import {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
} from "../errors/index.js";
import checkPermissions from "../utils/checkPermissions.js";
import mongoose from "mongoose";
import moment from "moment";

const createEmployee = async (req, res) => {
  const { EmployeeName } = req.body;
  if (!EmployeeName) {
    throw new BadRequestError("Please Provide All values");
  }

  const EmployeeID = Math.floor(Math.random() * 9000000000) + 1000000000;

  req.body.createdBy = req.user.userId;

  const employee = await Employee.create({ ...req.body, EmployeeID });
  res.status(StatusCodes.CREATED).json({ Employee });
};

// const getAllItems = async(req,res) =>{
//     const items = await Item.find({createdBy:req.user.userId})
//     res
//         .status(StatusCodes.OK)
//         .json({items,totalItems: items.length, numOfPages: 1})
// }

const getAllEmployees = async (req, res) => {
  const { status, itemSupplier, sort, search } = req.query;

  const queryObject = {
    createdBy: req.user.userId,
  };
  // add stuff based on condition

  if (status && status !== "all") {
    queryObject.status = status;
  }
  if (itemSupplier && itemSupplier !== "all") {
    queryObject.itemSupplier = itemSupplier;
  }
  if (search) {
    queryObject.EmployeeName = { $regex: search, $options: "i" };
  }
  // NO AWAIT

  let result = Employee.find(queryObject);

  // chain sort conditions

  if (sort === "latest") {
    result = result.sort("-createdAt");
  }
  if (sort === "oldest") {
    result = result.sort("createdAt");
  }
  if (sort === "a-z") {
    result = result.sort("EmployeeName");
  }
  if (sort === "z-a") {
    result = result.sort("-EmployeeName");
  }
  // setup pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const employees = await result;

  const totalEmployees = await Employee.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalEmployees / limit);

  res.status(StatusCodes.OK).json({ employees, totalEmployees, numOfPages });
};

const updateEmployee = async (req, res) => {
  const { id: employeeID } = req.params;
  const { EmployeeID, EmployeeName } = req.body;
  if (!EmployeeID || !EmployeeName) {
    throw new BadRequestError("Please Provide All values");
  }

  const employee = await Employee.findOne({ _id: employeeID });
  if (!employee) {
    throw new NotFoundError(`No Employee with id : ${employeeID}`);
  } //check permission

  checkPermissions(req.user, employee.createdBy);
  const updatedEmployee = await Employee.findOneAndUpdate(
    { _id: employeeID },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(StatusCodes.OK).json({ updatedEmployee });
};

const deleteEmployee = async (req, res) => {
  const { id: employeeID } = req.params;
  const employee = await Employee.findOne({ _id: employeeID });
  if (!employee) {
    throw new NotFoundError(`No Employee with id : ${employeeID}`);
  }
  checkPermissions(req.user, employee.createdBy);

  await employee.remove();
  res.status(StatusCodes.OK).json({ msg: "Success! Employee removed" });
};

const showEmployeeStats = async (req, res) => {
  let stats = await Employee.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    managers: stats.managers || 0,
    admins: stats.admins || 0,
    cashiers: stats.cashiers || 0,
  };

  let monthlyApplications = await Employee.aggregate([
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
    .map((employee) => {
      const {
        _id: { year, month },
        count,
      } = employee;
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
  createEmployee,
  deleteEmployee,
  getAllEmployees,
  updateEmployee,
  showEmployeeStats,
};
