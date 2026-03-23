const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

const savedLocations = [];

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/save-location", (req, res) => {
  const { latitude, longitude } = req.body;

  if (latitude == null || longitude == null) {
    return res.status(400).json({ success: false, message: "Missing location data" });
  }

  savedLocations.push({
    latitude,
    longitude,
    time: new Date().toLocaleString()
  });

  res.json({ success: true });
});

app.get("/locations", (req, res) => {
  res.json(savedLocations);
});

app.listen(PORT, () => {
  console.log("Server running at http://localhost:3000");
});