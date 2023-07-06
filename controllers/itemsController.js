import Item from "../models/Item.js"
import {StatusCodes} from 'http-status-codes'
import { BadRequestError, NotFoundError, UnAuthenticatedError } from "../errors/index.js"
import checkPermissions from "../utils/checkPermissions.js"
import mongoose from "mongoose";
import moment from 'moment';

const createItem = async(req,res) =>{
    const {ItemName} = req.body
    if( !ItemName){
        throw new BadRequestError('Please Provide All values')
    }

    req.body.createdBy = req.user.userId;
    const item = await Item.create(req.body);
    res.status(StatusCodes.CREATED).json({item});
}

// const getAllItems = async(req,res) =>{
//     const items = await Item.find({createdBy:req.user.userId})
//     res
//         .status(StatusCodes.OK)
//         .json({items,totalItems: items.length, numOfPages: 1})
// }

const getAllItems = async (req, res) => {
  const { ItemType, itemSupplier, sort, search } = req.query;

  const queryObject = {
    createdBy: req.user.userId,
  };
  // add stuff based on condition

  if (ItemType && ItemType !== 'all') {
    queryObject.ItemType = ItemType;
  }
  if (itemSupplier && itemSupplier !== 'all') {
    queryObject.itemSupplier = itemSupplier;
  }
  if (search) {
    queryObject.ItemName = { $regex: search, $options: 'i' };
  }
  // if(search){
  //   queryObject.ItemId ={$regex:search,$options:'i'};
  // }
  // NO AWAIT

  let result = Item.find(queryObject);

  // chain sort conditions

  if (sort === 'latest') {
    result = result.sort('-createdAt');
  }
  if (sort === 'oldest') {
    result = result.sort('createdAt');
  }
  if (sort === 'a-z') {
    result = result.sort('ItemName');
  }
  if (sort === 'z-a') {
    result = result.sort('-ItemName');
  }
  // setup pagination
const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const items = await result;

  const totalItems = await Item.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalItems / limit);

  res.status(StatusCodes.OK).json({ items, totalItems, numOfPages });
};


const updateItem = async(req,res) =>{
    const {id:itemId} = req.params;
    const {ItemName} = req.body;
        if(!ItemName){
        throw new BadRequestError('Please Provide All values');
    }

    const item = await Item.findOne({_id: itemId})
    if (!item){
        throw new NotFoundError(`No Item with id : ${itemId}`)
    }

    //check permission
checkPermissions(req.user, item.createdBy)
    const updatedItem = await Item.findOneAndUpdate({_id:itemId},req.body, {
        new:true,
        runValidators: true,
    });
    res.status(StatusCodes.OK).json({updatedItem});
};

const deleteItem = async(req,res) =>{
    const {id:itemId} = req.params
        const item = await Item.findOne({_id: itemId})
    if (!item){
        throw new NotFoundError(`No Item with id : ${itemId}`)
    }
    checkPermissions(req.user, item.createdBy)

 await item.remove();
   res.status(StatusCodes.OK).json({msg : 'Success! Item removed'})
}

const showStats = async (req, res) => {
  let stats = await Item.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: '$ItemType', count: { $sum: 1 } } },
  ]);
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    Laptops: stats.Laptops || 0,
    DesktopWorkStations: stats.DesktopWorkStations || 0,
    MotherBoards: stats.MotherBoards || 0,
        Processors: stats.Processors || 0,
    GraphicCards: stats.GraphicCards|| 0,
    Memory: stats.Memory || 0,
        Storage: stats.Storage || 0,
    Monitors: stats.Monitors || 0,
    ExternalStorages: stats.ExternalStorages || 0,
        Mouse: stats.Mouse || 0,
    KeyBoard: stats.KeyBoard || 0,
    Casings: stats.Casings || 0,
  };

  let monthlyApplications = await Item.aggregate([
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

export {createItem,deleteItem, getAllItems ,updateItem,showStats};
