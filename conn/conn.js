const mongoose = require("mongoose");

const conn = async () => {
    try {
        await mongoose.connect("mongodb+srv://todo_user:uCswZVIsiMAcNbMK@todo.wwjm17f.mongodb.net/?appName=todo");
        console.log("✅ Database Connected");
    } catch (error) {
        console.log("❌ Database connection failed", error);
        process.exit(1);
    }
};

module.exports = conn;
