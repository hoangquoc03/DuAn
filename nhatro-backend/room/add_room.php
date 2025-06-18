<?php
header('Content-Type: application/json');
include '../db.php';

$data = json_decode(file_get_contents("php://input"));

// Gán tenant_id nếu có, nếu không thì để NULL
$tenant_id = isset($data->tenant_id) ? $data->tenant_id : null;

$stmt = $conn->prepare("INSERT INTO rooms 
    (room_number, price, status, landlord_id, tenant_id, rented_from, due_date, created_at, updated_at) 
    VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())");

$stmt->bind_param(
    "sdsisss",
    $data->room_number,
    $data->price,
    $data->status,
    $data->landlord_id,
    $tenant_id,
    $data->rented_from,
    $data->due_date
);

if ($stmt->execute()) {
    echo json_encode(["message" => "Thêm phòng thành công"]);
} else {
    echo json_encode(["error" => $stmt->error]);
}
?>