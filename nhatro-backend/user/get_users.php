<?php
// Trả về JSON
header('Content-Type: application/json');

// Kết nối database
include '../db.php'; // nếu file nằm trong thư mục /user

// Truy vấn danh sách người dùng
$sql = "SELECT id, fullname, username, email, phone, role FROM users";
$result = $conn->query($sql);

$users = [];

if ($result) {
    while ($row = $result->fetch_assoc()) {
        $users[] = $row;
    }
    echo json_encode($users);
} else {
    echo json_encode([
        "error" => "Lỗi truy vấn: " . $conn->error
    ]);
}
?>