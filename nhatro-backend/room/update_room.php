<?php
header('Content-Type: application/json');
include '../db.php';

$data = json_decode(file_get_contents("php://input"));
$tenant_id = isset($data->tenant_id) ? $data->tenant_id : null;

$stmt = $conn->prepare("UPDATE rooms 
    SET room_number=?, price=?, status=?, landlord_id=?, tenant_id=?, rented_from=?, due_date=?, updated_at=NOW() 
    WHERE room_id=?");

$stmt->bind_param(
    "sdsisssi",
    $data->room_number,
    $data->price,
    $data->status,
    $data->landlord_id,
    $tenant_id,
    $data->rented_from,
    $data->due_date,
    $data->room_id
);

if ($stmt->execute()) {
    echo json_encode(["message" => "Cập nhật phòng thành công"]);
} else {
    echo json_encode(["error" => $stmt->error]);
}
?>