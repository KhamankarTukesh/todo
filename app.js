const express = require("express");
const app = express();
const cors = require("cors");
const list = require("./routes/list");
// DB Connection
const path = require("path");
const conn = require("./conn/conn");
conn();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
const auth = require("./routes/auth");
app.use("/api/v1", auth);
app.use("/api/v2",list);

// Serve static files from the React app build directory
app.use(express.static(path.resolve(__dirname, "frontend", "todo", "dist")));

// Catch all handler: send back React's index.html file for any non-API routes
app.use((req, res) => {
    if (req.path.startsWith('/api/')) {
        return res.status(404).json({ error: 'API endpoint not found' });
    }
    res.sendFile(path.resolve(__dirname, "frontend", "todo", "dist", "index.html"));
});
// Server Listen
app.listen(8080, () => {
    console.log("✅ Server running on port 8080");
});
