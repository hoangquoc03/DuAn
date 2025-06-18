<?php
header('Content-Type: application/json');
include '../db.php';

$data = json_decode(file_get_contents("php://input"));
if (!$data || !isset($data->landlord_id)) {
    echo json_encode(["error" => "Thiếu dữ liệu cập nhật"]);
    exit;
}

$id = $data->landlord_id;
$name = $data->name ?? '';
$phone = $data->phone ?? '';
$address = $data->address ?? '';

$stmt = $conn->prepare("UPDATE landlords SET name=?, phone=?, address=? WHERE landlord_id=?");
if (!$stmt) {
    echo json_encode(["error" => "Lỗi prepare: " . $conn->error]);
    exit;
}

$stmt->bind_param("sssi", $name, $phone, $address, $id);

if ($stmt->execute()) {
    echo json_encode(["message" => "Cập nhật chủ trọ thành công"]);
} else {
    echo json_encode(["error" => "Lỗi cập nhật: " . $stmt->error]);
}
?>