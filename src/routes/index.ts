import express from "express";
import { circlekRoute } from "./circlek.route";

const Router = express.Router();

Router.use("/circlek", circlekRoute);

export const API = Router;
