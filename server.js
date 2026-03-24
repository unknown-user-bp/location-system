const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

const savedEvents = [];

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/save-location", (req, res) => {
  const {
    latitude = null,
    longitude = null,
    accuracy = null,
    action = null,
    status = "unknown",
    note = ""
  } = req.body || {};

  const newEntry = {
    id: savedEvents.length + 1,
    latitude,
    longitude,
    accuracy,
    action,
    status,
    note,
    time: new Date().toLocaleString()
  };

  savedEvents.unshift(newEntry);

  res.json({
    success: true,
    message: "Event saved successfully.",
    data: newEntry
  });
});

app.get("/locations", (req, res) => {
  res.json({
    success: true,
    total: savedEvents.length,
    data: savedEvents
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});