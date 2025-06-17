<?php
include 'db.php';
$data = json_decode(file_get_contents("php://input"));

$stmt = $conn->prepare("INSERT INTO rooms (name, type, price, description) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssds", $data->name, $data->type, $data->price, $data->description);
$stmt->execute();

echo json_encode(["message" => "Thêm phòng thành công"]);
?>