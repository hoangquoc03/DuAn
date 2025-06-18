<?php
header('Content-Type: application/json');
include '../db.php';

$data = json_decode(file_get_contents("php://input"));
if (!$data || !isset($data->landlord_id)) {
    echo json_encode(["error" => "Thiếu ID cần xoá"]);
    exit;
}

$id = $data->landlord_id;

$stmt = $conn->prepare("DELETE FROM landlords WHERE landlord_id = ?");
if (!$stmt) {
    echo json_encode(["error" => "Lỗi prepare: " . $conn->error]);
    exit;
}

$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    echo json_encode(["message" => "Xoá chủ trọ thành công"]);
} else {
    echo json_encode(["error" => "Lỗi xoá: " . $stmt->error]);
}
?>