import Repair from "../models/Repair.js"
import {StatusCodes} from 'http-status-codes'
import { BadRequestError, NotFoundError, UnAuthenticatedError } from "../errors/index.js"
import checkPermissions from "../utils/checkPermissions.js"
import mongoose from "mongoose";
import moment from 'moment';

const createRepair = async(req,res) =>{
  const {customerName} = req.body
  if( !customerName){
    throw new BadRequestError('Please Provide All values')
  }

  req.body.createdBy = req.user.userId;
  const repair = await Repair.create(req.body);
  res.status(StatusCodes.CREATED).json({repair});
}

// const getAllItems = async(req,res) =>{
//     const items = await Item.find({createdBy:req.user.userId})
//     res
//         .status(StatusCodes.OK)
//         .json({items,totalItems: items.length, numOfPages: 1})
// }

const getAllRepairs = async (req, res) => {
  const { repairStatus, repairType, sort, search } = req.query;

  const queryObject = {
    createdBy: req.user.userId,
  };
  // add stuff based on condition

  if (repairStatus && repairStatus !== 'all') {
    queryObject.repairStatus = repairStatus;
  }
  if (repairType && repairType !== 'all') {
    queryObject.repairType = repairType;
  }
  if (search) {
    queryObject.customerName = { $regex: search, $options: 'i' };
  }
  // NO AWAIT

  let result = Repair.find(queryObject);

  // chain sort conditions

  if (sort === 'latest') {
    result = result.sort('-createdAt');
  }
  if (sort === 'oldest') {
    result = result.sort('createdAt');
  }
  if (sort === 'a-z') {
    result = result.sort('customerName');
  }
  if (sort === 'z-a') {
    result = result.sort('-customerName');
  }
  // setup pagination
const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const repairs = await result;

  const totalRepairs = await Repair.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalRepairs / limit);

  res.status(StatusCodes.OK).json({ repairs, totalRepairs, numOfPages });
};


const updateRepair = async(req,res) =>{
  const {id:repairId} = req.params;
  const {customerName} = req.body;
    if( !customerName){
    throw new BadRequestError('Please Provide All values');
  }

  const repair = await Repair.findOne({_id: repairId})
  if (!repair){
    throw new NotFoundError(`No Repair with id : ${repairId}`)
  }

  //check permission
checkPermissions(req.user, repair.createdBy)
  const updatedRepair = await Repair.findOneAndUpdate({_id:repairId},req.body, {
    new:true,
    runValidators: true,
  });
  res.status(StatusCodes.OK).json({updatedRepair});
};

const deleteRepair = async(req,res) =>{
  const {id:repairId} = req.params
    const repair = await Repair.findOne({_id: repairId})
  if (!repair){
    throw new NotFoundError(`No Repair with id : ${repairId}`)
  }
  checkPermissions(req.user, repair.createdBy)

 await repair.remove();
  res.status(StatusCodes.OK).json({msg : 'Success! Repair removed'})
}

const showRepairStats = async (req, res) => {
  let stats = await Repair.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: '$repairStatus', count: { $sum: 1 } } },
  ]);
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    completed: stats.completed || 0,
    processing: stats.processing || 0,
    toCompleted: stats.toCompleted || 0,
  };

  let monthlyApplications = await Repair.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
        count: { $sum: 1 },
      },
    },
    { $sort: { '_id.year': -1, '_id.month': -1 } },
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
        .format('MMM Y');
      return { date, count };
    })
    .reverse();

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};

export {createRepair,deleteRepair, getAllRepairs ,updateRepair,showRepairStats};
