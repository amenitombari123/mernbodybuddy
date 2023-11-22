// database.js
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import ENV from '../config.js';

import Feedback from "../model/feedback.model.js";

async function connect() {
  const mongod = await MongoMemoryServer.create();
  const getUri = mongod.getUri();

  mongoose.set('strictQuery', true);

  const db = await mongoose.connect(ENV.ATLAS_URI);

  // Add the Feedback model to the connection
  mongoose.model.Feedbacks = Feedback;

  console.log("Database Connected");
  return db;
}

export default connect;
