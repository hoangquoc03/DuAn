const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Giả lập lưu user trong bộ nhớ
let users = [];

// API đăng ký
app.post("/api/register", (req, res) => {
  const { Email, Phone, fullname, Username, Password } = req.body;

  // Kiểm tra username đã tồn tại chưa
  const existingUser = users.find((user) => user.Username === Username);
  if (existingUser) {
    return res.status(400).json({ message: "Tên đăng nhập đã tồn tại!" });
  }

  users.push({ Email, Phone, fullname, Username, Password });
  res.json({ message: "Đăng ký thành công!" });
});

// API đăng nhập
app.post("/api/login", (req, res) => {
  const { Username, Password } = req.body;

  const user = users.find(
    (user) => user.Username === Username && user.Password === Password
  );

  if (user) {
    res.json({
      message: "Đăng nhập thành công!",
      user: { fullname: user.fullname, Username },
    });
  } else {
    res.status(401).json({ message: "Sai tên đăng nhập hoặc mật khẩu!" });
  }
});
// const { v4: uuidv4 } = require("uuid");
const ROOMS_FILE = "./rooms.json";

// Đọc danh sách phòng từ file
function readRooms() {
  if (!fs.existsSync(ROOMS_FILE)) return [];
  return JSON.parse(fs.readFileSync(ROOMS_FILE));
}

// Ghi danh sách phòng vào file
function writeRooms(data) {
  fs.writeFileSync(ROOMS_FILE, JSON.stringify(data, null, 2));
}

// API: GET tất cả phòng hoặc lọc theo type
app.get("/api/rooms", (req, res) => {
  let rooms = readRooms();
  if (req.query.type) {
    rooms = rooms.filter((r) => r.type === req.query.type);
  }
  res.json(rooms);
});

// API: Thêm phòng mới
app.post("/api/rooms", (req, res) => {
  const room = { id: uuidv4(), ...req.body };
  const rooms = readRooms();
  rooms.push(room);
  writeRooms(rooms);
  res.json({ message: "Thêm phòng thành công", room });
});

// API: Cập nhật phòng theo ID
app.put("/api/rooms/:id", (req, res) => {
  const { id } = req.params;
  const rooms = readRooms();
  const index = rooms.findIndex((r) => r.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Không tìm thấy phòng" });
  }
  rooms[index] = { ...rooms[index], ...req.body };
  writeRooms(rooms);
  res.json({ message: "Cập nhật thành công", room: rooms[index] });
});

// API: Xoá phòng theo ID
app.delete("/api/rooms/:id", (req, res) => {
  const { id } = req.params;
  const rooms = readRooms();
  const filtered = rooms.filter((r) => r.id !== id);
  if (filtered.length === rooms.length) {
    return res.status(404).json({ message: "Không tìm thấy phòng" });
  }
  writeRooms(filtered);
  res.json({ message: "Xoá thành công" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});
