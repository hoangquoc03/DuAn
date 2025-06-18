<?php
header('Content-Type: application/json');
include '../db.php';

// Nhận dữ liệu JSON
$data = json_decode(file_get_contents("php://input"));
if (!$data || !isset($data->id)) {
    echo json_encode(["error" => "Thiếu ID người dùng"]);
    exit;
}

// Chuẩn bị xoá
$stmt = $conn->prepare("DELETE FROM users WHERE id = ?");
if (!$stmt) {
    echo json_encode(["error" => "Lỗi prepare: " . $conn->error]);
    exit;
}

$stmt->bind_param("i", $data->id);

if ($stmt->execute()) {
    echo json_encode(["message" => "Xoá người dùng thành công"]);
} else {
    echo json_encode(["error" => "Lỗi xoá người dùng: " . $stmt->error]);
}
?>