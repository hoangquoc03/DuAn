<?php
include 'db.php';
$data = json_decode(file_get_contents("php://input"));
$id = $data->id;

$stmt = $conn->prepare("DELETE FROM rooms WHERE id=?");
$stmt->bind_param("i", $id);
$stmt->execute();

echo json_encode(["message" => "Xoá phòng thành công"]);
?>