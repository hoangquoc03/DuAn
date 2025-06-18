<?php
header('Content-Type: application/json');
include '../db.php';

// Nhận dữ liệu JSON
$data = json_decode(file_get_contents("php://input"));
if (!$data || !isset($data->id)) {
    echo json_encode(["error" => "Thiếu dữ liệu cần cập nhật"]);
    exit;
}

// Gán biến từ dữ liệu nhận được
$id = $data->id;
$fullname = $data->fullname ?? '';
$email = $data->email ?? '';
$phone = $data->phone ?? '';
$role = $data->role ?? 'user';

// Cập nhật thông tin
$stmt = $conn->prepare("UPDATE users SET fullname=?, email=?, phone=?, role=? WHERE id=?");
if (!$stmt) {
    echo json_encode(["error" => "Lỗi prepare: " . $conn->error]);
    exit;
}

$stmt->bind_param("ssssi", $fullname, $email, $phone, $role, $id);

if ($stmt->execute()) {
    echo json_encode(["message" => "Cập nhật người dùng thành công"]);
} else {
    echo json_encode(["error" => "Lỗi cập nhật: " . $stmt->error]);
}
?>