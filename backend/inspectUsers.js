import mongoose from "mongoose";
import User from "./models/user.model.js";

const MONGO = "mongodb+srv://amirsohail2610:naknux-riXfe3-boqqij@amircluster.9uufnnq.mongodb.net/MERN?appName=AmirCluster";

async function inspectUsers() {
  try {
    await mongoose.connect(MONGO);
    console.log("✅ Connected to MongoDB\n");

    const users = await User.find({}).lean();
    console.log(`Found ${users.length} users:\n`);
    
    users.forEach((user, i) => {
      console.log(`User ${i + 1}:`);
      console.log(JSON.stringify(user, null, 2));
      console.log("---");
    });

    await mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

inspectUsers();
