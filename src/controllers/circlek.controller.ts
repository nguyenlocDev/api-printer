import express from "express";
import { StatusCodes } from "http-status-codes";
import { GET_DB_CIRCLEK } from "../config/mongo.config";
import { printCirclekBill } from "../models/circlel.models";

export const getStoreCirclek = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const total = await GET_DB_CIRCLEK().collection("store").countDocuments();

    const dataStore = await GET_DB_CIRCLEK()
      .collection("store")
      .find({}, { projection: { nameStore: 1, storeCode: 1 } })
      .skip(skip)
      .limit(limit)
      .toArray();
    res.status(StatusCodes.OK).json({
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
      data: dataStore,
    });
  } catch (error) {
    res.status(StatusCodes.BAD_GATEWAY).json({ message: "can not get data" });
  }
};
export const getEmployeCirclek = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const storeCode = req.query.store as string;
    const dataEmploye = await GET_DB_CIRCLEK()
      .collection("store")
      .find({ storeCode: storeCode }, { projection: { employe: 1, _id: 0 } })
      .toArray();
    res.status(StatusCodes.OK).json({
      data: dataEmploye,
    });
  } catch (error) {
    res
      .status(StatusCodes.BAD_GATEWAY)
      .json({ message: "can not get data employe" });
  }
};
export const getProductCirclek = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const search = (req.query.search as string) || "";

    // Tạo filter cho tìm kiếm
    const searchFilter = search
      ? {
          $or: [
            { articleName: { $regex: search, $options: "i" } },
            { barcode: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const total = await GET_DB_CIRCLEK().collection("product").countDocuments();

    const dataStore = await GET_DB_CIRCLEK()
      .collection("product")
      .find(searchFilter, {
        projection: { barcode: 1, articleName: 1, actualPrice: 1 },
      })
      .skip(skip)
      .limit(limit)
      .toArray();
    res.status(StatusCodes.OK).json({
      data: dataStore,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    });
  } catch (error) {
    res.status(StatusCodes.BAD_GATEWAY).json({ message: "can not get data" });
  }
};
export const printInvoiceCirclek = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const data = req.body;
    printCirclekBill(data);
    res.status(StatusCodes.OK).json({
      data: data,
    });
  } catch (error) {
    res.status(StatusCodes.BAD_GATEWAY).json({ message: "can not get data" });
  }
};
