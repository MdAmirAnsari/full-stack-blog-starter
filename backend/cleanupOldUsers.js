import mongoose from "mongoose";

const MONGO = "mongodb+srv://amirsohail2610:naknux-riXfe3-boqqij@amircluster.9uufnnq.mongodb.net/MERN?appName=AmirCluster";

async function cleanupOldUsers() {
  try {
    await mongoose.connect(MONGO);
    console.log("✅ Connected to MongoDB\n");

    // These old users don't have clerkUserId, so they're from a different app
    const result = await mongoose.connection.collection('users').deleteMany({
      clerkUserId: { $exists: false }
    });

    console.log(`🗑️  Deleted ${result.deletedCount} old/incompatible users`);
    console.log("✅ These were users from a different application that don't work with the blog app");
    
    // Check remaining users
    const remaining = await mongoose.connection.collection('users').find({}).toArray();
    console.log(`\n📊 Remaining users: ${remaining.length}`);
    
    if (remaining.length > 0) {
      console.log("Valid blog users:");
      remaining.forEach((user, i) => {
        console.log(`  ${i + 1}. ${user.username} (${user.email}) - Clerk ID: ${user.clerkUserId}`);
      });
    } else {
      console.log("\n⚠️  No blog users found.");
      console.log("   You need to sign up in the blog app to create a user via Clerk webhook.");
    }

    await mongoose.connection.close();
    console.log("\n✅ Cleanup complete");
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

cleanupOldUsers();
