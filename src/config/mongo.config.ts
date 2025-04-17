import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const mongoClientInstance = new MongoClient(process.env.MONGO_URI as string, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
let circlekDatabaseInstance: any;
export const CONNECT_DB = async () => {
  await mongoClientInstance.connect();
  circlekDatabaseInstance = mongoClientInstance.db(
    process.env?.DATABASE_NAME_CIRCLEK
  );
};
export const CLOSE_DB = async () => {
  console.log("close");
  await mongoClientInstance.close();
};
export const GET_DB_CIRCLEK = () => {
  if (!circlekDatabaseInstance) throw new Error("Must connect to database!");
  return circlekDatabaseInstance;
};
