const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;

/* middleware */
app.use(cors());
app.use(express.json());

/* path ke file data */
const dataPath = path.join(__dirname, "data", "messages.json");

/* cek server */
app.get("/", (req, res) => {
  res.send("Backend Portfolio sudah jalan 🚀");
});

/* API contact */
app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;

  // validasi
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "Data tidak lengkap"
    });
  }

  const newMessage = {
    id: Date.now(),
    name,
    email,
    message,
    time: new Date().toISOString()
  };

  // baca data lama
  const messages = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

  // tambah data baru
  messages.push(newMessage);

  // simpan kembali
  fs.writeFileSync(dataPath, JSON.stringify(messages, null, 2));

  console.log("📩 Pesan disimpan:", newMessage);

  res.json({
    success: true,
    message: "Pesan berhasil disimpan 📦"
  });
});

/* jalankan server */
app.listen(PORT, () => {
  console.log(`Server running di http://localhost:${PORT}`);
});
