require("dotenv").config();

const connectDB = require("../src/config/db");
const User = require("../src/models/User");

const email = process.argv[2];

if (!email) {
  console.error("");
  console.error("Please provide the email address of the account.");
  console.error("");
  console.error(
    "Example:"
  );
  console.error(
    "node scripts/makeAdmin.js your@email.com"
  );
  console.error("");

  process.exit(1);
}

const run = async () => {
  try {
    /*
     * Use NISRAYA's existing MongoDB connection function.
     *
     * This is important because db.js already contains
     * the DNS configuration required by this project.
     */
    await connectDB();

    console.log("MongoDB connection ready.");
    console.log("");

    const normalizedEmail = email
      .trim()
      .toLowerCase();

    const user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      console.error(
        `No NISRAYA account was found for ${normalizedEmail}.`
      );

      console.error("");
      console.error(
        "Create/login to the NISRAYA account first, then run this command again."
      );

      process.exit(1);
    }

    /*
     * Change ONLY this user's role.
     */
    user.role = "admin";

    await user.save();

    console.log("");
    console.log("========================================");
    console.log("     NISRAYA ADMIN ACCOUNT CREATED");
    console.log("========================================");
    console.log(`Name : ${user.name}`);
    console.log(`Email: ${user.email}`);
    console.log(`Role : ${user.role}`);
    console.log("========================================");
    console.log("");
    console.log(
      "This account can now use admin-only features."
    );
    console.log("");
    
    process.exit(0);
  } catch (error) {
    console.error("");
    console.error(
      "Admin setup failed:",
      error.message
    );
    console.error("");

    process.exit(1);
  }
};

run();