<?php
// File: room/delete_room.php
header('Content-Type: application/json');
include '../db.php';

$data = json_decode(file_get_contents("php://input"));

$stmt = $conn->prepare("DELETE FROM rooms WHERE room_id = ?");
$stmt->bind_param("i", $data->room_id);

if ($stmt->execute()) {
    echo json_encode(["message" => "Xoá phòng thành công"]);
} else {
    echo json_encode(["error" => $stmt->error]);
}
?>