<?php
header('Content-Type: application/json');

// Kết nối database
include '../db.php';

// Nhận dữ liệu từ frontend
$data = json_decode(file_get_contents("php://input"));
if (!$data) {
    echo json_encode(["error" => "Không có dữ liệu gửi lên"]);
    exit;
}

// Kiểm tra username đã tồn tại
$check = $conn->prepare("SELECT id FROM users WHERE username = ?");
$check->bind_param("s", $data->username);
$check->execute();
$check->store_result();

if ($check->num_rows > 0) {
    echo json_encode(["error" => "Tên đăng nhập đã tồn tại"]);
    exit;
}

// Gán dữ liệu vào biến
$fullname = $data->fullname ?? '';
$username = $data->username ?? '';
$password = $data->password ?? '';
$email = $data->email ?? '';
$phone = $data->phone ?? '';
$role = $data->role ?? 'user';

// Chuẩn bị câu lệnh SQL
$stmt = $conn->prepare("INSERT INTO users (fullname, username, password, email, phone, role) VALUES (?, ?, ?, ?, ?, ?)");

if (!$stmt) {
    echo json_encode(["error" => "Lỗi prepare: " . $conn->error]);
    exit;
}

// Bind và thực thi
$stmt->bind_param("ssssss", $fullname, $username, $password, $email, $phone, $role);

if ($stmt->execute()) {
    echo json_encode(["message" => "Đăng ký người dùng thành công"]);
} else {
    echo json_encode(["error" => "Lỗi thêm người dùng: " . $stmt->error]);
}
?>