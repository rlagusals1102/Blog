import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const password = process.env.MONGO_PASSWORD;
const rawConnectString =
  "mongodb+srv://rlagusals1102:<password>@atlascluster.gz5dee4.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster";

const connectString = rawConnectString.replace("<password>", password!);

async function connectDB(): Promise<void> {
  await mongoose.connect(connectString);
  console.log("Mongo Atlas is ready!");
}

export { connectDB };
