import mongoose from "mongoose";
import User from "./models/user.model.js";
import Post from "./models/post.model.js";

const MONGO = "mongodb+srv://amirsohail2610:naknux-riXfe3-boqqij@amircluster.9uufnnq.mongodb.net/MERN?appName=AmirCluster";

async function checkDatabase() {
  try {
    await mongoose.connect(MONGO);
    console.log("✅ Connected to MongoDB\n");

    const users = await User.find({});
    console.log(`📊 Total Users: ${users.length}`);
    if (users.length > 0) {
      console.log("Users:");
      users.forEach((user, i) => {
        console.log(`  ${i + 1}. ${user.username} (${user.email}) - Clerk ID: ${user.clerkUserId}`);
      });
    } else {
      console.log("⚠️  No users found in database!");
      console.log("   This means the Clerk webhook hasn't created any users yet.");
    }

    console.log();

    const posts = await Post.find({}).populate("user", "username");
    console.log(`📊 Total Posts: ${posts.length}`);
    if (posts.length > 0) {
      console.log("Posts:");
      posts.forEach((post, i) => {
        console.log(`  ${i + 1}. "${post.title}" by ${post.user?.username || 'Unknown'} - Slug: ${post.slug}`);
      });
    } else {
      console.log("⚠️  No posts found in database!");
    }

    await mongoose.connection.close();
    console.log("\n✅ Database check complete");
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

checkDatabase();
