const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const conn = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ Database Connected");
    } catch (error) {
        console.error("❌ Database connection failed:", error);
        process.exit(1);
    }
};

module.exports = conn;
