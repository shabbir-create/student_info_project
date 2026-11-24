const path = require("path");
const fs = require("fs");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { roll, tableSuffix } = require("./db");
const apiRoutes = require("./routes/api");

const app = express();
const port = Number(process.env.PORT || 4000);
const frontendDist = path.resolve(__dirname, "../../frontend/dist");

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "student-portal-api", rollNumber: roll });
});

app.use([`/api/${roll}`, `/api/${tableSuffix}`], apiRoutes);

if (fs.existsSync(frontendDist)) {
  app.use(express.static(frontendDist));
  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api")) {
      return next();
    }
    return res.sendFile(path.join(frontendDist, "index.html"));
  });
}

app.listen(port, process.env.HOST || "0.0.0.0", () => {
  console.log(`Student Portal server running at http://localhost:${port}`);
});
