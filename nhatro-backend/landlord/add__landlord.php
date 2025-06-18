<?php
header('Content-Type: application/json');
include '../db.php';

$data = json_decode(file_get_contents("php://input"));
if (!$data) {
    echo json_encode(["error" => "Thiếu dữ liệu gửi lên"]);
    exit;
}

$name = $data->name ?? '';
$phone = $data->phone ?? '';
$address = $data->address ?? '';

$stmt = $conn->prepare("INSERT INTO landlords (name, phone, address, created_at) VALUES (?, ?, ?, NOW())");
if (!$stmt) {
    echo json_encode(["error" => "Lỗi prepare: " . $conn->error]);
    exit;
}

$stmt->bind_param("sss", $name, $phone, $address);

if ($stmt->execute()) {
    echo json_encode(["message" => "Thêm chủ trọ thành công"]);
} else {
    echo json_encode(["error" => "Lỗi khi thêm: " . $stmt->error]);
}
?>