// ------------------------
// ☕ Coffee Shop Backend
// ------------------------
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// -----------------------------------------
// 🔹 MongoDB Connection
// -----------------------------------------
// Replace <username> and <password> with your real MongoDB Atlas credentials
mongoose
  .connect("mongodb+srv://rayyan:12345@cluster0.fevq0gh.mongodb.net/?appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ MongoDB Connection Failed:", err.message));

// -----------------------------------------
// 🔹 Mongoose Model (Menu Item)
// -----------------------------------------
const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  inStock: { type: Boolean, default: true },
});

const MenuItem = mongoose.model("MenuItem", menuItemSchema);

// -----------------------------------------
// 🔹 Insert Sample Data (Run Once)
// -----------------------------------------
async function insertSampleData() {
  const count = await MenuItem.countDocuments();
  if (count === 0) {
    await MenuItem.insertMany([
      { name: "Espresso", category: "Hot Drinks", price: 350, inStock: true },
      { name: "Cappuccino", category: "Hot Drinks", price: 450, inStock: true },
      { name: "Latte", category: "Hot Drinks", price: 400, inStock: false },
      { name: "Iced Coffee", category: "Cold Drinks", price: 500, inStock: true },
      { name: "Cold Mocha", category: "Cold Drinks", price: 550, inStock: true },
      { name: "Frappe", category: "Cold Drinks", price: 600, inStock: false },
    ]);
    console.log("✅ Sample menu data added!");
  }
}
insertSampleData();

// -----------------------------------------
// 🔹 Routes
// -----------------------------------------

// Get all menu items
app.get("/api/menu", async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get one random in-stock item
app.get("/api/menu/random", async (req, res) => {
  try {
    const inStockItems = await MenuItem.find({ inStock: true });
    if (inStockItems.length === 0)
      return res.json({ message: "No items available in stock" });

    const randomItem =
      inStockItems[Math.floor(Math.random() * inStockItems.length)];
    res.json(randomItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// -----------------------------------------
// 🔹 Start Server
// -----------------------------------------
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Backend server running at: http://localhost:${PORT}`);
});