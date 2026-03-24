const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// In-memory storage
const savedEvents = [];

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

/**
 * SAVE LOCATION / EVENT
 */
app.post("/save-location", (req, res) => {
  try {
    const {
      latitude = null,
      longitude = null,
      accuracy = null,
      action = "unknown",
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

    // Save latest first
    savedEvents.unshift(newEntry);

    console.log("📍 New Event:", newEntry);

    res.json({
      success: true,
      message: "Event saved successfully",
      data: newEntry
    });

  } catch (err) {
    console.error("❌ Save Error:", err);

    res.status(500).json({
      success: false,
      message: "Failed to save event"
    });
  }
});

/**
 * GET ALL LOCATIONS
 */
app.get("/locations", (req, res) => {
  try {
    res.json({
      success: true,
      total: savedEvents.length,
      data: savedEvents
    });
  } catch (err) {
    console.error("❌ Fetch Error:", err);

    res.status(500).json({
      success: false,
      message: "Failed to fetch data"
    });
  }
});

/**
 * OPTIONAL: CLEAR DATA (for testing)
 */
app.delete("/clear", (req, res) => {
  savedEvents.length = 0;

  res.json({
    success: true,
    message: "All data cleared"
  });
});

/**
 * SERVER START
 */
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});