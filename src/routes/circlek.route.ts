import express from "express";
import {
  getStoreCirclek,
  getEmployeCirclek,
  getProductCirclek,
  printInvoiceCirclek,
} from "../controllers/circlek.controller";

const Router = express.Router();
Router.route("/get-store").get(getStoreCirclek);
Router.route("/get-product").get(getProductCirclek);
Router.route("/get-employe").get(getEmployeCirclek);
Router.route("/print-invoice").post(printInvoiceCirclek);

export const circlekRoute = Router;
