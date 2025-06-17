<?php
include 'db.php';
$data = json_decode(file_get_contents("php://input"));

$stmt = $conn->prepare("UPDATE rooms SET name=?, type=?, price=?, description=? WHERE id=?");
$stmt->bind_param("ssdsi", $data->name, $data->type, $data->price, $data->description, $data->id);
$stmt->execute();

echo json_encode(["message" => "Cập nhật phòng thành công"]);
?>